'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/trpc/react'

export const EditTaskForm: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
  const utils = api.useUtils()

  const { data: task } = api.task.getTask.useQuery({ id })
  const { mutate, isPending, error } = api.task.editTask.useMutation({
    onSuccess: () => {
      toast.success('Task updated')
      void utils.task.invalidate()
      router.back()
    },
    onError: (error) => !error.data?.zodError && toast.error(error.message),
  })

  if (!task) return null

  const action = async (formData: FormData) => {
    const content = String(formData.get('content'))
    const due = formData.get('due') ? new Date(String(formData.get('due'))) : undefined

    mutate({ id: task.id, content, due })
  }
  return (
    <form action={action} className="space-y-4">
      <CardContent>
        <FormField
          name="content"
          label="Content"
          defaultValue={task.content}
          placeholder="What's the content of your task?"
          message={error?.data?.zodError?.content?.at(0)}
          disabled={isPending}
          asChild
        >
          <Textarea />
        </FormField>

        <FormField
          name="due"
          label="Due"
          type="datetime-local"
          defaultValue={task.due?.toISOString().slice(0, 16)}
          message={error?.data?.zodError?.due?.at(0)}
          disabled={isPending}
        />
      </CardContent>

      <CardFooter>
        <Button className="w-full" isLoading={isPending}>
          Save Changes
        </Button>
      </CardFooter>
    </form>
  )
}
