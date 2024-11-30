"use client"

import Loading from '@/app/components/Loading'
import ConfirmModal from '@/app/components/modals/ConfirmModal'
import { ProjectWBranding } from '@/app/types'
import { Projects } from '@prisma/client'
import axios from 'axios'
import Link from 'next/link'
import React, { useCallback, useEffect, useState } from 'react'
import { BiPencil } from 'react-icons/bi'
import { BsTrash2 } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<ProjectWBranding[]>([])
  const [selectedProject, setSelectedProject] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(1);

  const getAllProjects = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("/api/projects");
      setAllProjects(response.data)
      if (response.status === 200) {
        setIsLoading(false)
      }
    } catch (error) {
      toast(error as string);
    }
  }, []);
  useEffect(() => {
    getAllProjects()
  }, [getAllProjects, isDeleting]);



  const handleDeleteProject = useCallback(async (id: string) => {
    setIsProcessing(true);
    try {
      const response = await axios.post(`/api/projects/delete`, { id: id })
      toast.success("Marka silindi")
      if (response.status === 200) {
        setIsDeleting(prev => prev + 1);
      }
      handleCloseModal();
    } catch (error) {
      toast.error('İşlem sırasında bir hata oluştu.')
    } finally {
      setIsProcessing(false);
    }
  }, []);


  const handleOpenModal = (id: string) => {
    setIsModalOpen(true);
    setSelectedProject(id);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading === true) {
    return <Loading />
  }


  return (
    <div>
      <div className="flex justify-between">
        <div className="">
          <p className='text-3xl font-bold'>Projeler</p>
          <span className=''>burada projeleri yönetebilirsiniz</span>
        </div>
        <Link href="/admin/projeler/yeni-proje">
          <div className="flex items-center gap-x-3">
            <span className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer">
              yeni ekle <FaPlus />
            </span>
          </div>
        </Link>
      </div>

      {
        allProjects.length !== 0 ? (
          <div className="divide-y mt-4 ">
            {allProjects.map((project, index) => (
              <div key={index} className="py-3 flex items-center justify-between hover:bg-gray-50">
                <span className="uppercase">{project.name}</span>
                <span className="capitalize">{project.Brandings.name}</span>
                <div className="flex gap-3">
                  <button
                    className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100"
                    title="Düzenle"
                  >
                    <Link href={`/admin/projeler/${project.id}`}><BiPencil size={18} /></Link>
                  </button>

                  <button
                    onClick={() => handleOpenModal(project.id)}
                    className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                    title="Sil"
                  >
                    <BsTrash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-xl text-rose-800" role="alert">
            Her hangibir projeniz <span className="font-medium">bulunmuyor</span>
          </div>
        )
      }

      <ConfirmModal
        isModalOpen={isModalOpen}
        isProcessing={isProcessing}
        handleConfirm={handleDeleteProject}
        handleCloseModal={handleCloseModal}
        selectedBranding={selectedProject}
      />



    </div>
  )
}

export default page