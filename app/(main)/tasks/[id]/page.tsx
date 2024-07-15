import type { NextPage } from 'next'

import { EditTaskForm } from '@/components/task/edit-form'

interface Props {
  params: { id: string }
}

const Page: NextPage<Props> = ({ params }) => {
  return <EditTaskForm id={params.id} />
}

export default Page
