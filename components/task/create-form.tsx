'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/trpc/react'

export const CreateForm: React.FC = () => {
  const router = useRouter()
  const utils = api.useUtils()
  const { mutate, isPending, error } = api.task.createTask.useMutation({
    onSuccess: () => {
      toast.success('Task created')
      router.push('/tasks')
      void utils.task.getTasks.invalidate()
    },
    onError: (error) => !error.data?.zodError && toast.error(error.message),
  })

  const action = async (formData: FormData) => {
    const content = String(formData.get('content'))
    const due = formData.get('due') ? new Date(String(formData.get('due'))) : undefined

    mutate({ content, due })
  }

  return (
    <form action={action} className="space-y-4">
      <FormField
        name="content"
        label="Content"
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
        message={error?.data?.zodError?.due?.at(0)}
        disabled={isPending}
      />

      <Button className="w-full" isLoading={isPending}>
        Create Task
      </Button>
    </form>
  )
}
