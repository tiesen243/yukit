import type { NextPage } from 'next'

import { EditTaskForm } from '@/components/task/edit-form'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Modal } from './_modal'
import { api, HydrateClient } from '@/lib/trpc/server'

interface Props {
  params: { id: string }
}

const Page: NextPage<Props> = async ({ params }) => {
  void api.task.getTask.prefetch(params)

  return (
    <HydrateClient>
      <Modal>
        <Card className="w-[60svh]">
          <CardHeader>
            <CardTitle>Edit Task</CardTitle>
          </CardHeader>

          <EditTaskForm id={params.id} />
        </Card>
      </Modal>
    </HydrateClient>
  )
}

export default Page
