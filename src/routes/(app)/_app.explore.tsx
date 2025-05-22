import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_app/explore')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/_app/explore"!</div>
}
