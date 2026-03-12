-- ============================================================================
-- SYNTHEGENT MATRIX: AUTONOMOUS MULTI-AGENT RESEARCH ORCHESTRATION
-- Database Schema: Supabase (PostgreSQL) Implementation
-- ============================================================================
-- Complete schema for managing:
-- 1. Research queries & decomposition
-- 2. Multi-dimensional matrix generation
-- 3. Autonomous agent deployment & execution
-- 4. ROME consensus consolidation (paraconsistent logic)
-- 5. Cross-domain connection discovery
-- ============================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For full-text search optimization

-- ============================================================================
-- TIER 1: RESEARCH SESSION & QUERY MANAGEMENT
-- ============================================================================

CREATE TABLE research_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  
  -- Query metadata
  query_text TEXT NOT NULL,
  query_decomposed BOOLEAN DEFAULT FALSE,
  
  -- Session state machine
  status TEXT NOT NULL CHECK (status IN (
    'initialized',      -- User submitted query
    'decomposing',      -- Query decomposition in progress
    'matrix_generated', -- Matrix created, awaiting agent deployment
    'agents_deploying', -- Agents being instantiated
    'agents_working',   -- Agents actively researching
    'consolidating',    -- ROME consensus engine running
    'completed',        -- Full synthesis ready
    'failed',           -- Error occurred
    'archived'          -- Historical, no longer active
  )) DEFAULT 'initialized',
  
  -- Execution metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  started_processing_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  execution_time_seconds INT,
  
  -- Configuration
  max_agents INT DEFAULT 20,
  consolidation_timeout_minutes INT DEFAULT 120,
  enable_emergent_insights BOOLEAN DEFAULT TRUE,
  
  -- Outputs
  total_findings INT DEFAULT 0,
  contradiction_count INT DEFAULT 0
);

CREATE INDEX idx_sessions_user_status ON research_sessions(user_id, status);
CREATE INDEX idx_sessions_created ON research_sessions(created_at DESC);

-- ============================================================================
-- TIER 2: QUERY DECOMPOSITION & MATRIX GENERATION
-- ============================================================================

CREATE TABLE query_decompositions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
  
  -- Domain analysis
  primary_domain TEXT NOT NULL, -- e.g., "Decision Theory"
  secondary_domains TEXT[] NOT NULL, -- e.g., ["Game Theory", "Psychology", "Neuroscience"]
  
  -- Variable extraction
  key_variables JSONB NOT NULL, -- {name, type, relationship}[]
  
  -- Exploration vectors/axes
  exploration_axes TEXT[] NOT NULL, -- ["Theoretical", "Empirical", "Technical", "Applied", "Comparative"]
  axis_count INT NOT NULL DEFAULT 5,
  
  -- Success criteria
  success_criteria JSONB NOT NULL, -- [{criterion, measurable, target}]
  
  -- Methodology assignments
  methodology_map JSONB NOT NULL, -- {domain: methodology[]}
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_decompositions_session ON query_decompositions(session_id);

-- Matrix structure: the combinatorial research space
CREATE TABLE research_matrices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
  decomposition_id UUID REFERENCES query_decompositions(id) NOT NULL,
  
  -- Matrix dimensionality
  dimensionality INT NOT NULL CHECK (dimensionality >= 2 AND dimensionality <= 5),
  -- 2D: Topic × Approach
  -- 3D: Topic × Approach × Discipline
  -- 4D+: Topic × Approach × Discipline × Context × Temporal
  
  -- Matrix parameters
  dimension_names TEXT[] NOT NULL, -- e.g., ["Topic", "Approach", "Discipline"]
  cell_count INT NOT NULL, -- Total number of cells in matrix
  
  -- Serialized matrix structure
  matrix_structure JSONB NOT NULL, -- {dimensions, cells: [{coords, metadata}]}
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_matrices_session ON research_matrices(session_id);

-- ============================================================================
-- TIER 3: AGENT PERSONAS & DEPLOYMENT
-- ============================================================================

CREATE TABLE agent_personas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  matrix_id UUID REFERENCES research_matrices(id) ON DELETE CASCADE NOT NULL,
  
  -- Agent identity
  agent_number INT NOT NULL, -- 1-20
  axis_designation TEXT NOT NULL, -- "1A", "2B", "3C", etc.
  title TEXT NOT NULL, -- e.g., "Paraconsistent Logic Theorist"
  
  -- Expertise & mandate
  expertise_domain TEXT NOT NULL,
  research_mandate TEXT NOT NULL,
  
  -- Methodology & resources
  methodology_toolkit TEXT[] NOT NULL, -- ["Formal proofs", "Literature analysis", "Logical derivation"]
  data_sources TEXT[] NOT NULL, -- ["arXiv", "Stanford Encyclopedia", "Academic journals"]
  
  -- Performance metrics
  success_metrics JSONB NOT NULL, -- {metric: definition}
  
  -- Constraints
  scope_boundary TEXT,
  timeline_hours INT NOT NULL DEFAULT 3,
  output_word_limit INT NOT NULL DEFAULT 8000,
  
  -- Peer review configuration
  peer_review_agent_ids UUID[], -- Other agents that will review this agent
  
  -- Status & execution
  agent_status TEXT CHECK (agent_status IN ('idle', 'working', 'completed', 'error', 'pending_review')) DEFAULT 'idle',
  instantiated_at TIMESTAMP WITH TIME ZONE,
  work_started_at TIMESTAMP WITH TIME ZONE,
  work_completed_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_personas_matrix ON agent_personas(matrix_id);
CREATE INDEX idx_personas_status ON agent_personas(agent_status);

-- ============================================================================
-- TIER 4: AGENT RESEARCH OUTPUT & FINDINGS
-- ============================================================================

CREATE TABLE agent_research_briefs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES agent_personas(id) ON DELETE CASCADE NOT NULL,
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
  
  -- Research structure: Problem → Approach → Findings → Limitations → Implications
  problem_statement TEXT NOT NULL,
  approach_description TEXT NOT NULL,
  findings TEXT NOT NULL,
  limitations TEXT NOT NULL,
  implications TEXT NOT NULL,
  
  -- Extracted structured data
  key_claims TEXT[] NOT NULL,
  key_sentences TEXT[] NOT NULL,
  key_phrases TEXT[] NOT NULL,
  
  -- Quality metrics
  citation_density INT DEFAULT 0, -- Number of cited sources
  evidence_strength TEXT CHECK (evidence_strength IN ('theoretical', 'empirical', 'both')),
  limitation_acknowledgment BOOLEAN DEFAULT FALSE, -- Did agent acknowledge boundary conditions?
  
  -- Confidence calibration
  confidence_level FLOAT CHECK (confidence_level >= 0 AND confidence_level <= 1),
  uncertainty_quantification TEXT,
  
  -- Raw metadata
  raw_output TEXT,
  processing_metadata JSONB,
  
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  peer_reviewed BOOLEAN DEFAULT FALSE,
  peer_review_notes TEXT
);

CREATE INDEX idx_briefs_agent ON agent_research_briefs(agent_id);
CREATE INDEX idx_briefs_session ON agent_research_briefs(session_id);
CREATE INDEX idx_briefs_submitted ON agent_research_briefs(submitted_at DESC);

-- Extracted claims from each brief (for aggregation)
CREATE TABLE research_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brief_id UUID REFERENCES agent_research_briefs(id) ON DELETE CASCADE NOT NULL,
  agent_id UUID REFERENCES agent_personas(id) NOT NULL,
  
  -- Claim content & context
  claim_text TEXT NOT NULL,
  claim_type TEXT CHECK (claim_type IN ('theoretical', 'empirical', 'methodological', 'practical')),
  context TEXT,
  
  -- Claim metadata
  supporting_evidence TEXT[],
  evidence_count INT DEFAULT 0,
  condition_boundary TEXT, -- When does this claim hold?
  
  -- Vectorization for aggregation
  claim_embedding VECTOR(1536) DEFAULT NULL, -- For semantic search (if using pgvector)
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_claims_brief ON research_claims(brief_id);
CREATE INDEX idx_claims_agent ON research_claims(agent_id);

-- ============================================================================
-- TIER 5: ROME CONSENSUS CONSOLIDATION ENGINE
-- ============================================================================

-- Stage 1: Baseline Extraction Results
CREATE TABLE baseline_consensus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
  
  -- Convergent findings (supported by 2+ agents)
  convergent_claims JSONB NOT NULL, -- {claim_text, supporting_agents: UUID[], support_count: INT}[]
  
  -- Contradictions (divergent findings)
  contradictions JSONB NOT NULL, -- {claim_a, claim_b, positions: {agent_id, stance}[], resolution_needed: BOOLEAN}[]
  
  -- Claim strength scoring
  claim_strength_scores JSONB NOT NULL, -- {claim_id, score, components: {citation_density, agent_diversity, evidence_type}}
  
  -- Summary statistics
  total_claims_extracted INT NOT NULL DEFAULT 0,
  convergent_claim_count INT NOT NULL DEFAULT 0,
  contradiction_count INT NOT NULL DEFAULT 0,
  avg_agreement_percentage FLOAT,
  
  extraction_completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_baseline_session ON baseline_consensus(session_id);

-- Stage 2: State 2 Localization (Paraconsistent Logic Processing)
CREATE TABLE state_two_resolutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
  contradiction_id UUID, -- Reference back to specific contradiction
  
  -- The contradiction itself
  contradiction_statement TEXT NOT NULL,
  position_a TEXT NOT NULL,
  position_a_agents UUID[] NOT NULL,
  position_a_evidence TEXT[],
  position_a_scope TEXT, -- What context does this apply to?
  position_a_boundary TEXT, -- Limitations of this position
  
  position_b TEXT NOT NULL,
  position_b_agents UUID[] NOT NULL,
  position_b_evidence TEXT[],
  position_b_scope TEXT,
  position_b_boundary TEXT,
  
  -- Paraconsistent Resolution
  both_true BOOLEAN NOT NULL DEFAULT FALSE, -- Determined that both can be true
  context_dependent_resolution TEXT, -- How are both true?
  
  -- State 2 Representation
  state_2_explanation TEXT NOT NULL,
  reconciliation_logic TEXT NOT NULL,
  actionable_implication TEXT NOT NULL,
  
  -- Required follow-up research
  requires_further_research BOOLEAN DEFAULT TRUE,
  research_gap_description TEXT,
  
  resolution_confidence FLOAT CHECK (resolution_confidence >= 0 AND resolution_confidence <= 1),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_resolutions_session ON state_two_resolutions(session_id);

-- Stage 3: Synthesis & Emergent Insights
CREATE TABLE emergent_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
  
  -- Insight metadata
  insight_title TEXT NOT NULL,
  insight_description TEXT NOT NULL,
  
  -- Origin & composition
  derived_from_claims UUID[], -- Which research claims led to this?
  derived_from_resolutions UUID[], -- Which State 2 resolutions contributed?
  agent_contributor_count INT,
  domain_breadth INT, -- How many domains contributed?
  
  -- Why it emerged
  why_not_directly_predictable TEXT NOT NULL,
  domains_bridged TEXT[] NOT NULL, -- Which domains does this connect?
  
  -- Impact assessment
  potential_impact_description TEXT,
  paradigm_shift_potential TEXT CHECK (paradigm_shift_potential IN ('high', 'medium', 'low')),
  
  -- Confidence & uncertainty
  emergence_confidence FLOAT CHECK (emergence_confidence >= 0 AND emergence_confidence <= 1),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_insights_session ON emergent_insights(session_id);
CREATE INDEX idx_insights_impact ON emergent_insights(paradigm_shift_potential);

-- ROME Consolidation Summary
CREATE TABLE rome_consensus_summary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  
  -- Core findings summary
  baseline_id UUID REFERENCES baseline_consensus(id) NOT NULL,
  
  -- State 2 processing results
  state_two_resolutions_count INT NOT NULL DEFAULT 0,
  resolutions_applied JSONB, -- Summary of how contradictions were resolved
  
  -- Emergent insights
  emergent_insight_ids UUID[] DEFAULT ARRAY[]::UUID[],
  emergent_insight_count INT NOT NULL DEFAULT 0,
  
  -- Meta-finding (the highest-level pattern)
  meta_finding TEXT,
  meta_finding_confidence FLOAT,
  
  -- Synthesis quality metrics
  information_retention_percentage FLOAT CHECK (information_retention_percentage >= 0 AND information_retention_percentage <= 100),
  contradiction_resolution_percentage FLOAT,
  nuance_preservation_score FLOAT,
  
  -- Consolidated output (for delivery)
  executive_summary TEXT,
  baseline_consensus_text TEXT,
  contradiction_map_text TEXT,
  implementation_roadmap_text TEXT,
  research_agenda_text TEXT,
  
  consolidation_completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_rome_summary_session ON rome_consensus_summary(session_id);

-- ============================================================================
-- TIER 6: CROSS-DOMAIN CONNECTIONS & PATTERNS
-- ============================================================================

CREATE TABLE cross_domain_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
  
  -- Connection endpoints (can be claims, resolutions, or insights)
  source_type TEXT NOT NULL CHECK (source_type IN ('claim', 'resolution', 'insight')),
  source_id UUID NOT NULL, -- Points to research_claims, state_two_resolutions, or emergent_insights
  source_description TEXT,
  source_domain TEXT,
  
  target_type TEXT NOT NULL CHECK (target_type IN ('claim', 'resolution', 'insight')),
  target_id UUID NOT NULL,
  target_description TEXT,
  target_domain TEXT,
  
  -- Connection characteristics
  connection_type TEXT NOT NULL CHECK (connection_type IN (
    'supports',           -- Source strengthens target
    'contradicts',        -- Source weakens/opposes target
    'complements',        -- Source + target together > parts
    'enables',            -- Source makes target possible
    'modifies',           -- Source changes target's scope/application
    'generalizes_to',     -- Source abstracts to target
    'applies_to',         -- Source specializes to target
    'bridges_domains'     -- Connects previously separate domains
  )),
  
  -- Tier classification
  tier_level INT NOT NULL CHECK (tier_level IN (1, 2, 3)),
  -- Tier 1: Foundational Dualities (simple concept pairs)
  -- Tier 2: Behavioral + Technical (compound interactions)
  -- Tier 3: Systemic + Civilizational (emergent, large-scale patterns)
  
  -- Connection strength & evidence
  strength_score FLOAT CHECK (strength_score >= 0 AND strength_score <= 1),
  supporting_evidence TEXT[],
  
  -- Implications
  implication_description TEXT,
  actionability_score FLOAT CHECK (actionability_score >= 0 AND actionability_score <= 1),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_connections_session ON cross_domain_connections(session_id);
CREATE INDEX idx_connections_source ON cross_domain_connections(source_type, source_id);
CREATE INDEX idx_connections_target ON cross_domain_connections(target_type, target_id);
CREATE INDEX idx_connections_tier ON cross_domain_connections(tier_level);

-- Pattern discovery (higher-order structures)
CREATE TABLE discovered_patterns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
  
  -- Pattern definition
  pattern_name TEXT NOT NULL,
  pattern_description TEXT NOT NULL,
  
  -- Composition
  involved_connections UUID[] NOT NULL, -- Which connections form this pattern?
  connection_count INT NOT NULL,
  
  -- Characteristics
  pattern_type TEXT CHECK (pattern_type IN (
    'feedback_loop',
    'hierarchy',
    'cascade',
    'equilibrium',
    'phase_transition',
    'network_motif',
    'constraint_set',
    'attractor'
  )),
  
  domains_involved TEXT[] NOT NULL,
  
  -- Significance
  pattern_generality TEXT CHECK (pattern_generality IN ('specific', 'domain_specific', 'cross_domain', 'universal')),
  theoretical_significance TEXT,
  practical_applicability TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_patterns_session ON discovered_patterns(session_id);

-- ============================================================================
-- TIER 7: OUTPUT FORMATTING & DELIVERY
-- ============================================================================

CREATE TABLE synthesis_briefs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL UNIQUE,
  rome_summary_id UUID REFERENCES rome_consensus_summary(id) NOT NULL,
  
  -- Multi-format outputs
  format_type TEXT CHECK (format_type IN ('json', 'markdown', 'html', 'pdf')) DEFAULT 'markdown',
  
  -- Brief sections
  title TEXT NOT NULL,
  
  executive_summary_section TEXT,
  baseline_consensus_section TEXT,
  contradiction_map_section TEXT,
  emergent_insights_section TEXT,
  implementation_roadmap_section TEXT,
  research_agenda_section TEXT,
  
  -- Actionability vectors (tailored per audience)
  audience_customizations JSONB, -- {audience_type: {sections, emphasis, format}}
  
  -- Metadata
  word_count INT,
  generation_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_for_delivery BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_briefs_session ON synthesis_briefs(session_id);

-- Audience-specific delivery formats
CREATE TABLE delivery_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brief_id UUID REFERENCES synthesis_briefs(id) ON DELETE CASCADE NOT NULL,
  
  audience_type TEXT NOT NULL CHECK (audience_type IN (
    'academic_researcher',
    'policymaker',
    'technical_team',
    'practitioner',
    'funding_organization'
  )),
  
  -- Content selection
  included_sections TEXT[] NOT NULL,
  key_elements JSONB,
  visualization_type TEXT,
  
  -- Delivery format
  output_format TEXT,
  generated_content TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_packages_brief ON delivery_packages(brief_id);
CREATE INDEX idx_packages_audience ON delivery_packages(audience_type);

-- ============================================================================
-- TIER 8: OPERATIONAL LOGS & AUDIT TRAIL
-- ============================================================================

CREATE TABLE execution_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES research_sessions(id) ON DELETE CASCADE NOT NULL,
  
  -- Event tracking
  event_type TEXT NOT NULL CHECK (event_type IN (
    'session_started',
    'query_decomposed',
    'matrix_generated',
    'agent_instantiated',
    'agent_started_work',
    'agent_completed_work',
    'agent_error',
    'baseline_extraction_completed',
    'state_two_processing_completed',
    'emergent_insights_identified',
    'synthesis_completed',
    'delivery_generated'
  )),
  
  event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Event details
  details JSONB,
  related_entity_type TEXT, -- 'agent', 'claim', 'resolution', etc.
  related_entity_id UUID,
  
  -- Error handling
  error_message TEXT,
  error_severity TEXT CHECK (error_severity IN ('info', 'warning', 'error', 'critical')),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_logs_session ON execution_logs(session_id);
CREATE INDEX idx_logs_event_type ON execution_logs(event_type);
CREATE INDEX idx_logs_timestamp ON execution_logs(event_timestamp DESC);

-- ============================================================================
-- SECURITY: ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE research_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own sessions" ON research_sessions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own sessions" ON research_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own sessions" ON research_sessions
  FOR UPDATE USING (auth.uid() = user_id);

-- All related tables inherit access through research_sessions
ALTER TABLE query_decompositions ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_matrices ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_research_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE baseline_consensus ENABLE ROW LEVEL SECURITY;
ALTER TABLE state_two_resolutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergent_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE rome_consensus_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE cross_domain_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE discovered_patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE synthesis_briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE execution_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Access through session" ON query_decompositions
  FOR SELECT USING (
    session_id IN (SELECT id FROM research_sessions WHERE auth.uid() = user_id)
  );

CREATE POLICY "Access through session" ON research_matrices
  FOR SELECT USING (
    session_id IN (SELECT id FROM research_sessions WHERE auth.uid() = user_id)
  );

CREATE POLICY "Access through session" ON agent_personas
  FOR SELECT USING (
    matrix_id IN (SELECT id FROM research_matrices WHERE session_id IN (
      SELECT id FROM research_sessions WHERE auth.uid() = user_id
    ))
  );

-- Similar policies for all other dependent tables...

-- ============================================================================
-- HELPFUL VIEWS FOR QUERYING
-- ============================================================================

-- Comprehensive session overview
CREATE VIEW session_overview AS
SELECT 
  rs.id,
  rs.user_id,
  rs.query_text,
  rs.status,
  rs.created_at,
  COUNT(DISTINCT ap.id) as agent_count,
  COUNT(DISTINCT arb.id) as research_brief_count,
  COUNT(DISTINCT rc.id) as claim_count,
  COUNT(DISTINCT ei.id) as insight_count,
  AVG(CAST(arb.confidence_level AS FLOAT)) as avg_agent_confidence,
  (rs.completed_at - rs.created_at) as total_execution_time
FROM research_sessions rs
LEFT JOIN research_matrices rm ON rs.id = rm.session_id
LEFT JOIN agent_personas ap ON rm.id = ap.matrix_id
LEFT JOIN agent_research_briefs arb ON ap.id = arb.agent_id
LEFT JOIN research_claims rc ON arb.id = rc.brief_id
LEFT JOIN emergent_insights ei ON rs.id = ei.session_id
GROUP BY rs.id, rs.user_id, rs.query_text, rs.status, rs.created_at, rs.completed_at;

-- Agent performance metrics
CREATE VIEW agent_performance_metrics AS
SELECT 
  ap.id,
  ap.title,
  ap.axis_designation,
  ap.agent_status,
  COUNT(arb.id) as brief_count,
  AVG(CAST(arb.confidence_level AS FLOAT)) as avg_confidence,
  AVG(CAST(LENGTH(arb.findings) AS FLOAT)) as avg_findings_length,
  COUNT(DISTINCT rc.id) as total_claims,
  (ap.work_completed_at - ap.work_started_at) as execution_duration
FROM agent_personas ap
LEFT JOIN agent_research_briefs arb ON ap.id = arb.agent_id
LEFT JOIN research_claims rc ON arb.id = rc.brief_id
GROUP BY ap.id, ap.title, ap.axis_designation, ap.agent_status, ap.work_started_at, ap.work_completed_at;

-- Contradiction resolution effectiveness
CREATE VIEW contradiction_resolution_analysis AS
SELECT 
  session_id,
  COUNT(*) as total_contradictions,
  COUNT(CASE WHEN both_true THEN 1 END) as both_true_resolutions,
  COUNT(CASE WHEN requires_further_research THEN 1 END) as unresolved_contradictions,
  AVG(CAST(resolution_confidence AS FLOAT)) as avg_resolution_confidence
FROM state_two_resolutions
GROUP BY session_id;

-- ============================================================================
-- MAINTENANCE & UTILITY FUNCTIONS
-- ============================================================================

-- Trigger to update session status based on completion
CREATE OR REPLACE FUNCTION update_session_status()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.consensus_completed_at IS NOT NULL) THEN
    UPDATE research_sessions 
    SET status = 'completed', updated_at = NOW()
    WHERE id = NEW.session_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER session_status_trigger
AFTER INSERT OR UPDATE ON rome_consensus_summary
FOR EACH ROW EXECUTE FUNCTION update_session_status();

-- Trigger to calculate execution time
CREATE OR REPLACE FUNCTION calculate_session_duration()
RETURNS TRIGGER AS $$
BEGIN
  IF (NEW.completed_at IS NOT NULL AND NEW.created_at IS NOT NULL) THEN
    NEW.execution_time_seconds := EXTRACT(EPOCH FROM (NEW.completed_at - NEW.created_at))::INT;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER duration_calculation_trigger
BEFORE UPDATE ON research_sessions
FOR EACH ROW EXECUTE FUNCTION calculate_session_duration();

-- Clean up function for archived sessions
CREATE OR REPLACE FUNCTION archive_old_sessions(days_old INT DEFAULT 30)
RETURNS INT AS $$
DECLARE
  archived_count INT;
BEGIN
  UPDATE research_sessions
  SET status = 'archived'
  WHERE status = 'completed' 
    AND completed_at < NOW() - INTERVAL '1 day' * days_old;
  
  GET DIAGNOSTICS archived_count = ROW_COUNT;
  RETURN archived_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMMENTS & DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE research_sessions IS 'High-level container for a single Synthegent Matrix research query execution';
COMMENT ON TABLE agent_personas IS 'Individual AI agent with specific expertise domain, mandate, and toolkit';
COMMENT ON TABLE agent_research_briefs IS 'Raw research output from an agent (Problem → Approach → Findings → Implications)';
COMMENT ON TABLE state_two_resolutions IS 'Paraconsistent logic processing: holding contradictions in State 2 rather than forcing resolution';
COMMENT ON TABLE emergent_insights IS 'Insights that emerge only from synthesis, visible when contradictions held in suspension';
COMMENT ON TABLE rome_consensus_summary IS 'Complete ROME consensus consolidation output: baseline findings, resolutions, emergent insights';
COMMENT ON TABLE cross_domain_connections IS 'Links between research findings across domains, forming the discovery matrix';

-- ============================================================================
-- INDEX OPTIMIZATION FOR COMMON QUERIES
-- ============================================================================

-- Query pattern: Find all agents working on a session
CREATE INDEX idx_agents_by_session_status ON agent_personas(matrix_id)
WHERE agent_status != 'idle';

-- Query pattern: Get all claims from active agents
CREATE INDEX idx_briefs_by_status ON agent_research_briefs(session_id)
WHERE peer_reviewed = FALSE;

-- Query pattern: Find contradictions in a session
CREATE INDEX idx_resolutions_by_both_true ON state_two_resolutions(session_id)
WHERE both_true = TRUE;

-- Query pattern: Search claims by text
CREATE INDEX idx_claims_fulltext ON research_claims
USING GIN (to_tsvector('english', claim_text));

-- ============================================================================
-- FINAL NOTES
-- ============================================================================
/*
 * USAGE WORKFLOW:
 * 
 * 1. CREATE research_session
 * 2. INSERT query_decomposition (user provides query)
 * 3. CREATE research_matrix (system generates from decomposition)
 * 4. BULK INSERT agent_personas (20 agents for standard query)
 * 5. AGENTS WORK (external process) → INSERT agent_research_briefs
 * 6. INSERT research_claims (from each brief)
 * 7. BASELINE EXTRACTION → INSERT baseline_consensus
 * 8. STATE 2 PROCESSING → INSERT state_two_resolutions
 * 9. EMERGENT SYNTHESIS → INSERT emergent_insights
 * 10. FINAL CONSOLIDATION → INSERT rome_consensus_summary
 * 11. GENERATE delivery packages (per audience type)
 * 12. MARK session as 'completed'
 * 
 * PERFORMANCE TIPS:
 * - Use batch inserts for agent_research_briefs (bulk INSERT)
 * - Partition large tables by session_id if dataset grows
 * - Vacuum regularly on high-volume tables
 * - Monitor index usage with pg_stat_user_indexes
 */
