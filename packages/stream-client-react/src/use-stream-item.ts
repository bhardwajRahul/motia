import { StreamSubscription } from '@motiadev/stream-client-browser'
import { useEffect, useState } from 'react'
import { useMotiaStream } from './use-motia-stream'

type Args = {
  streamName: string
  id: string
}

export const useStreamItem = <TData>(args?: Args) => {
  const { stream } = useMotiaStream()
  const [data, setData] = useState<TData | null>(null)
  const [event, setEvent] = useState<StreamSubscription | null>(null)

  useEffect(() => {
    if (!args?.id || !args?.streamName) return

    const subscription = stream.subscribeItem(args.streamName, args.id)

    subscription.addChangeListener((data) => setData(data as TData))
    setEvent(subscription)

    return () => {
      setData(null)
      subscription.close()
    }
  }, [stream, args?.streamName, args?.id])

  return { data, event }
}
