import { CalendarIcon, CheckIcon, ClipboardIcon, CombineIcon } from 'lucide-react'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'

const Page: NextPage = () => {
  const navs = [
    { title: 'Features', href: '#features' },
    { title: 'Pricing', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'About', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Contact', href: 'https://tiesen.id.vn/#cta' },
  ]

  const features = [
    {
      title: 'Task Management',
      description: 'Easily create, assign, and track tasks for your team.',
      icon: ClipboardIcon,
    },
    {
      title: 'Calendar Integration',
      description: 'Sync your tasks with your calendar for a seamless workflow.',
      icon: CalendarIcon,
    },
    {
      title: 'Checklists',
      description: 'Break down tasks into subtasks and track progress.',
      icon: CheckIcon,
    },
    {
      title: 'Collaboration',
      description: 'Invite team members and collaborate on tasks in real-time.',
      icon: CombineIcon,
    },
  ]

  return (
    <>
      {/* Header */}
      <header className="flex h-14 items-center px-4 lg:px-6">
        <div className="flex items-center justify-center">
          <Image src="/imgs/logo.svg" width="24" height="24" alt="Yukit" className="dark:invert" />
          <span className="sr-only">Yukit</span>
        </div>

        <nav className="ml-auto flex gap-4 sm:gap-6">
          {navs.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              className="text-sm font-medium underline-offset-4 hover:underline"
              prefetch={false}
            >
              {title}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Effortless Task Management
                  </h1>

                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Stay organized and productive with our powerful task manager app. Streamline
                    your workflow and achieve your goals with ease.
                  </p>
                </div>

                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/sign-up" className={buttonVariants()}>
                    Sign Up
                  </Link>

                  <Link href="/sign-in" className={buttonVariants({ variant: 'outline' })}>
                    Try It Now
                  </Link>
                </div>
              </div>
              <Image
                src="/imgs/logo.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-center dark:invert sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ title, description, icon: Icon }, idx) => (
                <div
                  key={idx}
                  className="flex cursor-default flex-col items-start gap-2 rounded-lg bg-background p-4 shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="size-8" />
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Workflow
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our task manager app is designed to help you and your team stay organized,
                  productive, and focused. Manage your tasks with ease and achieve your goals.
                </p>
              </div>
              <Link href="/sign-up" className={buttonVariants()} prefetch={false}>
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Yukit. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link href="#" className="text-xs underline-offset-4 hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs underline-offset-4 hover:underline" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  )
}

export default Page
