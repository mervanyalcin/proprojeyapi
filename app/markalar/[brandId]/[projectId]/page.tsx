"use client"

import React, { use, useCallback, useEffect, useState } from 'react'
import Container from '@/app/components/Container'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Projects } from '@prisma/client'
import PhotoGallery from '@/app/components/PhotoGallery'


const page = ({ params }: { params: Promise<{ brandId: string, projectId: string }> }) => {
  const [currentProject, setCurrentProject] = useState<Projects>()
  const [photos, setPhotos] = useState<string[]>([])
  const resolvedParams = use(params);

  const getCurrentProject = useCallback(async () => {
    try {
      const response = await axios.post("/api/projects/current", { id: resolvedParams.projectId })
      setCurrentProject(response.data)
      setPhotos(response.data.photoLinks)
    } catch (error) {
      toast.error(error as string)
    }
  }, [])
  useEffect(() => {
    getCurrentProject()
  }, [getCurrentProject])



  return (
    <div className="">
      <div className="bg-themeColorOne py-20 text-themeColorThird text-5xl font-bold text-center mt-8 capitalize"> {currentProject?.name} </div>

      <Container>
        {/* <div className="bg-themeColorOne py-2 px-10 text-themeColorThird font-bold text-center mt-8 capitalize">
          <Breadcrumb items={breadcrumbItems} />
        </div> */}
        <div className="min-h-screen py-10 ">
          <div className="flex gap-x-4">

            <div className="w-1/3 bg-themeColorOne p-4 rounded-xl py-10">
              <p className='text-themeColorThird text-3xl font-bold mb-8'>Proje detayı</p>
              <p className='text-themeColorThird'>
                {currentProject?.description}, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit reprehenderit, molestias deserunt accusamus enim eaque in doloribus illo minus harum, sit, officiis nihil rem facilis earum laborum quis placeat aperiam.
              </p>
            </div>
            <div className="w-2/3 bg-themeColorOne p-4 rounded-xl py-10">

              <PhotoGallery photos={photos} />

            </div>



          </div>

        </div>
      </Container>
    </div>
  )
}

export default page