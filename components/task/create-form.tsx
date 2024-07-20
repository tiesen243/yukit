'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { FormField } from '@/components/form-field'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/trpc/react'
import { cn } from '@/lib/utils'

export const CreateForm: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const toggleVisible = () => setVisible((prev) => !prev)

  const utils = api.useUtils()
  const { mutate, isPending, error } = api.task.createTask.useMutation({
    onSuccess: async () => {
      await utils.task.invalidate()
      toast.success('Task created')
      setVisible(false)
    },
  })

  const action = async (formData: FormData) => {
    const data = {
      content: String(formData.get('content')),
      due: formData.get('due') ? new Date(String(formData.get('due'))) : undefined,
    }

    mutate(data)
  }

  return (
    <div className="fixed bottom-4 flex w-full flex-col items-center gap-8 px-8">
      <AnimatePresence>
        {visible && (
          <>
            <motion.div
              className="fixed inset-0 h-full w-full bg-background/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleVisible}
            />
            <motion.form
              action={action}
              className="z-10 w-full rounded-lg border bg-card p-4 text-card-foreground md:w-1/2"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              layout
            >
              <FormField
                name="content"
                placeholder="What do you need to do?"
                message={error?.data?.zodError?.content?.at(0)}
                asChild
              >
                <textarea className="min-h-20 w-full bg-card outline-none" />
              </FormField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  name="due"
                  label="Due to"
                  type="datetime-local"
                  className="flex items-center gap-2 space-y-0 whitespace-nowrap md:col-span-2"
                  message={error?.data?.zodError?.due?.at(0)}
                />

                <Button isLoading={isPending}>Add</Button>
              </div>
            </motion.form>
          </>
        )}
      </AnimatePresence>

      <Button className="w-full md:w-1/2" onClick={toggleVisible} disabled={isPending}>
        <XIcon className={cn('transition-transform', visible ? 'rotate-0' : 'rotate-45')} />
      </Button>
    </div>
  )
}
