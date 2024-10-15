'use client'

import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from '@/components/global/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/global/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { useState } from 'react'
import { BiTaskX } from 'react-icons/bi'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { MdTaskAlt } from 'react-icons/md'
import { RiTaskFill } from 'react-icons/ri'

const tabs = [
  {
    id: 'all-tasks',
    icon: <MdTaskAlt className="text-accent" size={18} />,
    title: 'Todas as Tarefas',
    total: '50',
  },
  {
    id: 'pending-tasks',
    icon: <BiTaskX className="text-accent" size={18} />,
    title: 'Tarefas Pendentes',
    total: '70',
    Out_of_time: '30',
    within_the_deadline: '15',
  },
  {
    id: 'completed-tasks',
    icon: <RiTaskFill className="text-accent" size={18} />,
    title: 'Tarefas Concluídas',
    total: '20',
    Out_of_time: '5',
    within_the_deadline: '2',
  },
]

export function TasksCard() {
  const [activeTab, setActiveTab] = useState('all-tasks')

  const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)

  const nextTab = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id)
    }
  }

  const prevTab = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id)
    }
  }

  return (
    <>
      <Card className="bg-light w-full h-48 space-y-3 flex flex-col">
        <Tabs defaultValue="all-tasks" value={activeTab}>
          <TabsList>
            <TabsTrigger
              value=""
              onClick={prevTab}
              className={`w-8 h-8 active:scale-95 duration-500 border 
                rounded-md hover:bg-neutral_hover ${currentIndex === 0 ? 'opacity-50' : ''}`}
              disabled={currentIndex === 0}
            >
              <LuChevronLeft size={18} />
            </TabsTrigger>
            <TabsTrigger
              value=""
              onClick={nextTab}
              className={`w-8 h-8 active:scale-95 duration-500 border
                rounded-md hover:bg-neutral_hover ${currentIndex === tabs.length - 1 ? 'opacity-50' : ''}`}
              disabled={currentIndex === tabs.length - 1}
            >
              <LuChevronRight size={18} />
            </TabsTrigger>
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-4">
              <CardContent className="space-y-3  flex flex-col items-start">
                <CardHeader className="flex-row gap-2 items-center justify-between w-full">
                  <div className="flex items-center justify-center p-2 rounded-md bg-neutral">
                    {tab.icon}
                  </div>
                  <div className="flex gap-2 items-center justify-between w-full">
                    <CardTitle>{tab.title}</CardTitle>
                    <span className="text-lg font-semibold leading-none tracking-tigh">
                      {tab.total}
                    </span>
                  </div>
                </CardHeader>
                <div className="space-y-1.5 border-t w-full flex items-center  ">
                  {tab.id === 'all-tasks' ? (
                    ''
                  ) : (
                    <div className="flex flex-col space-y-1 ml-10 w-full mt-1">
                      <div className="flex gap-1 w-full  justify-between">
                        <span className="font-bold text-green-500  ">
                          <span className="font-normal text-sm text-secondary/50 mr-2">
                            Dentro do prazo:
                          </span>
                          {tab.within_the_deadline}
                        </span>
                        <span className="font-normal text-sm text-secondary/50">
                          {(
                            (parseInt(tab.within_the_deadline || '') /
                              parseInt(tab.total)) *
                            100
                          ).toFixed(2)}
                          %
                        </span>
                      </div>
                      <div className="flex gap-1 w-full  justify-between">
                        <span className="font-bold text-red-500  ">
                          <span className="font-normal text-sm text-secondary/50 mr-2">
                            Fora do prazo:
                          </span>
                          {tab.Out_of_time}
                        </span>
                        <span className="font-normal text-sm text-secondary/50">
                          {(
                            (parseInt(tab.Out_of_time || '') /
                              parseInt(tab.total)) *
                            100
                          ).toFixed(2)}
                          %
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </>
  )
}
