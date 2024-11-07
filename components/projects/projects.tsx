import { ProjectsType } from "../../pages/projects";
import { useTheme } from "../layout";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export const Projects = ({ data }: { data: ProjectsType[] }) => {
  const theme = useTheme();

  return (
    <div className="min-h-screen">
      <div className="mb-7 text-sm font-lato">
        <h3 className="text-2xl font-bold mb-5 border-b border-gray-250 font-eb-garamond">
          Projects
        </h3>
      </div>

      <ul className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        {data.map((v) => <li key={v.node.id}><Project data={v} /></li>)}
      </ul>
    </div>
  )
}

const Project: React.FC<{ data: ProjectsType } > = ({ data }) => {
  const theme = useTheme();

  return (
    <Link href={data.node.external ? data.node.external : `/projects/${data.node._sys.filename}`}
          className='relative block transition ease-curve-a duration-250 border border-gray-300 bg-[#f5faff] w-full max-w-[25rem] h-full hover:text-sail-500 !bg-none !p-0'
          passHref={!!data.node.external}
          target={data.node.external ? '_blank' : '_self'}
      >
      <div className='h-full max-h-[6rem]'>
        <Image src={data.node.cover ? data.node.cover : '/uploads/placeholder.jpg'} style={{ objectFit: 'cover', width: '100%', height: '100%'}} width={419} height={219} alt='project' />
      </div>
      <div className="leading-snug text-balance pointer-events-none select-none py-3 px-3 border-t-2 border-sail-200">
        <h3 className='text-lg font-semibold font-eb-garamond text-sail-500'>{data.node.title}{" "}</h3>
        <p className='text-xs mt-2 line-clamp-3'>{data.node.description}</p>
      </div>
    </Link>
  )
}