"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircleIcon,
  AlertOctagonIcon,
  AlertTriangleIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  Layers3Icon,
  LockIcon,
  LucideIcon,
  SearchIcon,
  Settings2Icon,
  ShieldAlertIcon,
  UserIcon,
  UsersIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {};

const Siderbar = (props: Props) => {
  const [showProjects, setShowProjects] = useState<boolean>(true);
  const [showPriority, setShowPriority] = useState<boolean>(true);

  const { data: projects } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col justify-between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white
    ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
  `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-full w-full flex-col justify-start">
        {/* top logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            LMList
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="size-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* team */}
        <div className="flex items-center gap-5 border-y-[1px] border-gray-200 px-8 py-4 dark:border-gray-700">
          {/* <Image src="/logo.png" alt="logo" width={40} height={40} /> */}
          <div className="">
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              Leozin Team
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Navbar links */}
        <nav className="z-10 w-full">
          <SidebarLink icon={HomeIcon} label="Home" href="/" />
          <SidebarLink icon={BriefcaseIcon} label="Timeline" href="/timeline" />
          <SidebarLink icon={SearchIcon} label="Search" href="/search" />
          <SidebarLink icon={Settings2Icon} label="Settings" href="/settings" />
          <SidebarLink icon={UserIcon} label="Users" href="/users" />
          <SidebarLink icon={UsersIcon} label="Teams" href="/teams" />
        </nav>

        {/* projects links */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUpIcon className="size-5" />
          ) : (
            <ChevronDownIcon className="size-5" />
          )}
        </button>

        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={BriefcaseIcon}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}

        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUpIcon className="size-5" />
          ) : (
            <ChevronDownIcon className="size-5" />
          )}
        </button>

        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircleIcon}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlertIcon}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangleIcon}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink
              icon={AlertOctagonIcon}
              label="Low"
              href="/priority/low"
            />
            <SidebarLink
              icon={Layers3Icon}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}

        {/* projects list */}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""} justify-start px-8 py-2`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[5px] bg-blue-200"></div>
        )}

        <Icon className="size-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Siderbar;
