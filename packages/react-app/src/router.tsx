import { createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout'
import { TopicRenderer } from './components/TopicRenderer'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: ':category/:topicId',
        Component: TopicRenderer,
      },
    ],
  },
])
