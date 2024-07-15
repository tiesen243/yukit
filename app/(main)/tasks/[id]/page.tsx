import type { NextPage } from 'next'

import { EditTaskForm } from '@/components/task/edit-form'
import { api, HydrateClient } from '@/lib/trpc/server'

interface Props {
  params: { id: string }
}

const Page: NextPage<Props> = async ({ params }) => {
  void api.task.getTask.prefetch(params)

  return (
    <HydrateClient>
      <EditTaskForm id={params.id} />
    </HydrateClient>
  )
}

export default Page
