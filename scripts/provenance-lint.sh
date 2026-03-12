#!/usr/bin/env bash
# ============================================================================
# provenance-lint.sh — Automated provenance & attribution linter
# ============================================================================
# Based on the 10-point checklist in:
#   docs/provenance/ATTRIBUTION_LANGUAGE_RULES_2026-03-12.md (Section 7)
#
# Usage:
#   ./scripts/provenance-lint.sh [file_or_dir]   # lint specific target
#   ./scripts/provenance-lint.sh                  # lint entire repo
#
# Exit codes:
#   0 = all checks pass
#   1 = one or more FAIL results
#   2 = warnings only (no FAIL)
# ============================================================================

set -uo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

PASS_COUNT=0
FAIL_COUNT=0
WARN_COUNT=0
SKIP_COUNT=0

TARGET="${1:-.}"

# Resolve to absolute path
if [[ -d "$TARGET" ]]; then
  SEARCH_PATH="$TARGET"
  MODE="directory"
elif [[ -f "$TARGET" ]]; then
  SEARCH_PATH="$TARGET"
  MODE="file"
else
  echo -e "${RED}ERROR: '$TARGET' is not a valid file or directory${NC}"
  exit 1
fi

echo -e "${BOLD}${CYAN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║          PROVENANCE LINTER — Attribution Safety       ║${NC}"
echo -e "${BOLD}${CYAN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Target: ${BOLD}$TARGET${NC} (${MODE})"
echo -e "Date:   $(date -u '+%Y-%m-%dT%H:%M:%SZ')"
echo ""

# Helper: run a ripgrep check
# Args: check_id, description, pattern, severity (FAIL|WARN), expect (found|notfound)
run_check() {
  local id="$1"
  local desc="$2"
  local pattern="$3"
  local severity="$4"
  local expect="$5"

  local rg_args=("-in" "--glob" "*.md")

  # Skip deprecated files (they're kept for history, not active use)
  rg_args+=("--glob" "!**/gilm_meaning_tone_engine.md")
  # Skip historical records
  rg_args+=("--glob" "!**/PAST_CLAUDE.md")
  rg_args+=("--glob" "!**/walkthrough.md.resolved.md")
  # Skip content that quotes Symbiquity directly
  rg_args+=("--glob" "!**/notebooklm-prefix.md")
  # Skip attribution rules (they list prohibited phrases as examples)
  rg_args+=("--glob" "!**/ATTRIBUTION_RULES.md")
  rg_args+=("--glob" "!**/ATTRIBUTION_LANGUAGE_RULES*.md")
  # Skip discovery/raw notes
  rg_args+=("--glob" "!**/0ovo0.md")
  # Skip provenance docs (they reference prohibited phrases in context)
  rg_args+=("--glob" "!**/docs/provenance/*.md")
  # Skip external canonical material
  rg_args+=("--glob" "!**/external/symbiquity_canonical/*.md")
  # Skip pipeline docs that describe Symbiquity's architecture
  rg_args+=("--glob" "!**/research/06_existing_pipeline/*.md")
  # Skip discovery docs (raw notes / quotations)
  rg_args+=("--glob" "!**/docs/discovery/*.md")

  local matches
  matches=$(rg "${rg_args[@]}" "$pattern" "$SEARCH_PATH" 2>/dev/null || true)

  if [[ "$expect" == "notfound" ]]; then
    # We expect NO matches — finding any is a problem
    if [[ -z "$matches" ]]; then
      echo -e "  ${GREEN}✅ $id${NC}: $desc"
      ((PASS_COUNT++))
    else
      local count
      count=$(echo "$matches" | wc -l | tr -d ' ')
      if [[ "$severity" == "FAIL" ]]; then
        echo -e "  ${RED}❌ $id${NC}: $desc ${RED}($count violations)${NC}"
        echo "$matches" | head -5 | while IFS= read -r line; do
          echo -e "     ${RED}→ $line${NC}"
        done
        if (( count > 5 )); then
          echo -e "     ${RED}... and $((count - 5)) more${NC}"
        fi
        ((FAIL_COUNT++))
      else
        echo -e "  ${YELLOW}⚠️  $id${NC}: $desc ${YELLOW}($count occurrences)${NC}"
        echo "$matches" | head -3 | while IFS= read -r line; do
          echo -e "     ${YELLOW}→ $line${NC}"
        done
        ((WARN_COUNT++))
      fi
    fi
  else
    # We expect matches — NOT finding any is a problem
    if [[ -n "$matches" ]]; then
      echo -e "  ${GREEN}✅ $id${NC}: $desc"
      ((PASS_COUNT++))
    else
      if [[ "$severity" == "FAIL" ]]; then
        echo -e "  ${RED}❌ $id${NC}: $desc ${RED}(not found)${NC}"
        ((FAIL_COUNT++))
      else
        echo -e "  ${YELLOW}⚠️  $id${NC}: $desc ${YELLOW}(not found)${NC}"
        ((WARN_COUNT++))
      fi
    fi
  fi
}

# ============================================================================
# PROHIBITED PHRASING CHECKS (expect NOT found → violations)
# ============================================================================
echo -e "${BOLD}─── Prohibited Phrasing ───${NC}"

run_check "LINT-01" \
  "No 'Palace OS includes/implements/does/has'" \
  "Palace OS (includes|implements|does|has|system contains)" \
  "FAIL" "notfound"

run_check "LINT-02" \
  "No 'Symbiquity's [Jero concept]'" \
  "Symbiquity's (MirrorState|DreamArtifact|SentinelAgent|MELD|TONE|HUSH|VEIL)" \
  "FAIL" "notfound"

run_check "LINT-03" \
  "No 'GILM Extension' as current name" \
  "(Jero's GILM|extending GILM|GILM Extension Proposal)" \
  "WARN" "notfound"

run_check "LINT-04" \
  "No identity language" \
  "(is part of Palace|implements Palace|extends their platform|DTRN implements Palace)" \
  "FAIL" "notfound"

run_check "LINT-05" \
  "No 'Symbiquity platform/architecture/system does'" \
  "Symbiquity (platform|architecture|system) (does|uses|contains|includes)" \
  "FAIL" "notfound"

run_check "LINT-06" \
  "No 'Palace OS State-2 quarantine'" \
  "Palace OS State-2 quarantine" \
  "FAIL" "notfound"

run_check "LINT-07" \
  "No 'Part of the Palace architecture'" \
  "(?<!not )(?<!not affiliated with, endorsed by, or )Part of the Palace" \
  "FAIL" "notfound"

echo ""

# ============================================================================
# REQUIRED ELEMENTS CHECKS (expect FOUND → missing is a problem)
# ============================================================================
echo -e "${BOLD}─── Required Elements ───${NC}"

# Only run research-specific checks when scanning research dirs
if [[ "$MODE" == "directory" ]]; then
  run_check "LINT-08" \
    "Origin frontmatter present in research docs" \
    "^origin:" \
    "WARN" "found"

  run_check "LINT-09" \
    "Attribution note present in research docs" \
    "^attribution_note:" \
    "WARN" "found"
else
  # Single file check
  run_check "LINT-08" \
    "Origin frontmatter present" \
    "^origin:" \
    "WARN" "found"

  run_check "LINT-09" \
    "Attribution note present" \
    "^attribution_note:" \
    "WARN" "found"
fi

run_check "LINT-10" \
  "Independent Research disclaimer present" \
  "(Independent (design notes|Research|research proposals))" \
  "WARN" "found"

echo ""

# ============================================================================
# SUMMARY
# ============================================================================
echo -e "${BOLD}─── Summary ───${NC}"
echo -e "  ${GREEN}PASS${NC}: $PASS_COUNT"
echo -e "  ${RED}FAIL${NC}: $FAIL_COUNT"
echo -e "  ${YELLOW}WARN${NC}: $WARN_COUNT"
echo ""

if (( FAIL_COUNT > 0 )); then
  echo -e "${RED}${BOLD}RESULT: FAIL${NC} — $FAIL_COUNT attribution violation(s) detected"
  exit 1
elif (( WARN_COUNT > 0 )); then
  echo -e "${YELLOW}${BOLD}RESULT: WARN${NC} — $WARN_COUNT warning(s), review recommended"
  exit 2
else
  echo -e "${GREEN}${BOLD}RESULT: PASS${NC} — All attribution checks clean"
  exit 0
fi
