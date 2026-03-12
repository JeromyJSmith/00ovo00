This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.

# Summary

## Purpose

This is a reference codebase organized into multiple files for AI consumption.
It is designed to be easily searchable using grep and other text-based tools.

## File Structure

This skill contains the following reference files:

| File | Contents |
|------|----------|
| `project-structure.md` | Directory tree with line counts per file |
| `files.md` | All file contents (search with `## File: <path>`) |
| `tech-stack.md` | Languages, frameworks, and dependencies |
| `summary.md` | This file - purpose and format explanation |

## Usage Guidelines

- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes

- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: app/**, lib/**, *.ts, *.json, *.css, *.mjs
- Files matching these patterns are excluded: node_modules/**, .next/**
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

## Statistics

23 files | 2,025 lines

| Language | Files | Lines |
|----------|------:|------:|
| TypeScript | 9 | 903 |
| TypeScript (TSX) | 9 | 966 |
| JavaScript (ESM) | 2 | 25 |
| JSON | 2 | 68 |
| CSS | 1 | 63 |

**Largest files:**
- `app/page.tsx` (238 lines)
- `lib/neo4j.ts` (189 lines)
- `app/components/Triangle3D.tsx` (169 lines)
- `app/components/Knob.tsx` (165 lines)
- `lib/triangle.ts` (150 lines)
- `lib/audio.ts` (136 lines)
- `lib/supabase.ts` (130 lines)
- `app/ceremony/page.tsx` (109 lines)
- `app/components/FrequencyViz.tsx` (101 lines)
- `app/api/graph/route.ts` (84 lines)