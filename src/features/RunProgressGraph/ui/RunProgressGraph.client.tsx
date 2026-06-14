import { Background, BackgroundVariant, Controls, Handle, Position, ReactFlow, ReactFlowProvider } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import type { Edge, Node, NodeProps, NodeTypes } from '@xyflow/react'
import {
  checkColor,
  checkInk,
  currentBorder,
  currentRing,
  dotColor,
  dotgridColor,
  edgeActiveColor,
  edgeColor,
  edgeLoopColor,
  gatePalette,
  labelForStatus,
  NODE_FONT_SIZE,
  nodeBorder,
  nodeInk,
  nodeShadow,
  nodeSurface,
  paletteForStatus,
  rolePalette,
} from 'src/shared/ui'
import { RUN_STEPS } from 'src/shared/fixtures'

const ROW_Y = 80
const COL_GAP = 210
const COL_0 = 20
const LOOP_OFFSET = 70

interface StepNodeData {
  readonly label: string
  readonly status: string
  readonly kind: 'role' | 'gate'
  readonly current: boolean
  [key: string]: unknown
}

// Prototype DAG node (.design/dag.jsx + screens.css .dnode): raised warm card,
// teal role-token icon, per-status tone dot, status caption. Gate nodes read
// the warm gate accent. The running step gets a brand ring (is-current).
const StepFlowNode = ({ data }: NodeProps<Node<StepNodeData>>) => {
  const isGate = data.kind === 'gate'
  const gate = gatePalette()
  const accent = isGate ? gate : rolePalette()
  const status = paletteForStatus(data.status)
  const done = data.status === 'succeeded' || data.status === 'completed'
  const restBorder = isGate ? gate.border : nodeBorder
  const cardBorder = data.current ? currentBorder : restBorder

  return (
    <div
      style={{
        position: 'relative',
        padding: '10px 12px',
        borderRadius: 11,
        border: `1px solid ${cardBorder}`,
        background: isGate ? gate.bg : nodeSurface,
        color: nodeInk,
        fontFamily: 'Inter, sans-serif',
        minWidth: 150,
        boxShadow: data.current ? `0 0 0 3px ${currentRing}, ${nodeShadow}` : nodeShadow,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            position: 'relative',
            width: 24,
            height: 24,
            borderRadius: 7,
            display: 'grid',
            placeItems: 'center',
            color: accent.fg,
            background: accent.bg,
            border: `1px solid ${accent.border}`,
            fontSize: NODE_FONT_SIZE.meta,
            fontWeight: 600,
          }}
        >
          {isGate ? '⛩' : data.label.slice(0, 1).toUpperCase()}
          {done ? (
            <span
              style={{
                position: 'absolute',
                right: -5,
                bottom: -5,
                width: 13,
                height: 13,
                borderRadius: '50%',
                background: checkColor,
                color: checkInk,
                display: 'grid',
                placeItems: 'center',
                fontSize: 8,
                border: `1.5px solid ${nodeSurface}`,
              }}
            >
              ✓
            </span>
          ) : null}
        </span>
        <span style={{ fontSize: NODE_FONT_SIZE.label, fontWeight: 600, flex: 1 }}>{data.label}</span>
        <span style={{ width: 8, height: 8, borderRadius: '50%', flex: 'none', background: dotColor(data.status) }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7 }}>
        {isGate ? (
          <span
            style={{
              fontSize: NODE_FONT_SIZE.caption,
              fontWeight: 600,
              color: gate.fg,
              letterSpacing: '.05em',
              textTransform: 'uppercase',
            }}
          >
            human gate
          </span>
        ) : null}
        <span
          style={{ fontSize: NODE_FONT_SIZE.meta, color: status.fg, textTransform: 'capitalize', marginLeft: 'auto' }}
        >
          {labelForStatus(data.status)}
        </span>
      </div>
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  )
}

const nodeTypes: NodeTypes = { step: StepFlowNode }

const initialNodes: Node<StepNodeData>[] = RUN_STEPS.map((step, index) => ({
  id: step.id,
  type: 'step',
  position: { x: COL_0 + index * COL_GAP, y: ROW_Y },
  data: { label: step.label, status: step.status, kind: step.kind, current: step.status === 'running' },
}))

const sequentialEdges: Edge[] = RUN_STEPS.slice(1).map((step, index) => {
  const prev = RUN_STEPS[index]
  const active = prev.status === 'succeeded' || prev.status === 'running'
  return {
    id: `${prev.id}-${step.id}`,
    source: prev.id,
    target: step.id,
    style: { stroke: active ? edgeActiveColor : edgeColor, strokeWidth: active ? 1.75 : 1.4 },
  }
})

// Rework loop: reviewer can route back to developer (teal dashed arc).
const loopEdge: Edge = {
  id: 'reviewer-developer-loop',
  source: 'reviewer',
  target: 'developer',
  label: 'review loop',
  type: 'smoothstep',
  animated: true,
  sourceHandle: null,
  targetHandle: null,
  style: { stroke: edgeLoopColor, strokeDasharray: '5 4' },
  labelStyle: { fontSize: NODE_FONT_SIZE.meta, fill: edgeLoopColor },
  pathOptions: { offset: LOOP_OFFSET },
} as Edge

const initialEdges: Edge[] = [...sequentialEdges, loopEdge]

const RunProgressFlow = () => (
  <ReactFlow
    defaultNodes={initialNodes}
    defaultEdges={initialEdges}
    nodeTypes={nodeTypes}
    fitView
    fitViewOptions={{ padding: 0.2 }}
    proOptions={{ hideAttribution: true }}
    nodesDraggable={false}
  >
    <Background variant={BackgroundVariant.Dots} gap={18} size={1} color={dotgridColor} />
    <Controls showInteractive={false} />
  </ReactFlow>
)

const RunProgressGraphClient = () => (
  <ReactFlowProvider>
    <RunProgressFlow />
  </ReactFlowProvider>
)

export default RunProgressGraphClient
