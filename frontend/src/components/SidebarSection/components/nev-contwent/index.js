'use client';
import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import { chevronDown, chevronRight } from '@/assets/svg';
import Link from 'next/link';
import useSidebar from '../../hooks/useSidebar';
import DialogComponentsMapping from '../../common/dialog-components';
import { useStateContext } from '@/store';
import styles from '../style.module.scss';
import { getAccessToken } from '@/services/storageUtils';

const NavContent = () => {
  const {
    isOpen,
    handleClick,
    activeUrl,
    openDropdown,
    toggleDropdown,
    handleRedirect,
    updateSidebarData,
    t,
  } = useSidebar();
  const { dispatch } = useStateContext();

  const buttonComponents = ({ url, id, icon, title }) => {
    return (
      <SidebarMenuItem key={`${id}-${url}`} className="list-none">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton
              onClick={() => handleClick(url)}
              className={`group-data-[collapsible=icon]:!w-[3rem] group-data-[collapsible=icon]:m-auto group-data-[collapsible=icon]:!h-[3rem] group-data-[collapsible=icon]:!px-[1rem]
                w-full font-bold text-lg flex items-center gap-2 cursor-pointer transition-colors p-3 rounded-lg
                bg-new-primary hover:bg-[#2a1a2a] hover:text-yellow-400 text-white`}
            >
              <Image src={icon} alt={title} width={18} height={18} />
              <span className="text-sm/[17px] font-semibold group-data-[collapsible=icon]:invisible">
                {title}
              </span>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            {title}
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    );
  };

  return (
    <div className="grid gap-2">
      {updateSidebarData?.map(({ id, icon, title, type, options = [] }) => {
        if (type === 'dropdown') {
          return (
            <Collapsible
              key={`${id}-${title}`}
              open={openDropdown === id}
              onOpenChange={() => {
                toggleDropdown(id);
              }}
              defaultOpen={false}
              className="group/collapsible rounded"
            >
              <SidebarGroup className="p-0">
                <SidebarGroupLabel
                  asChild
                  className="px-3 py-[23px] group-data-[collapsible=icon]:px-[8px]"
                >
                  <CollapsibleTrigger
                    aria-label={`Toggle ${title}`}
                    className="group-data-[collapsible=icon]:opacity-100 group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:m-auto !bg-[hsl(var(--new-header))]
                    w-full flex items-center px-4 py-6 rounded-xl border-2 border-yellow-400 text-white font-bold text-lg bg-gradient-to-r from-black via-[#1c0f18] to-black hover:bg-gradient-to-r hover:from-[#2a1a2a] hover:via-[#1c0f18] hover:to-[#2a1a2a] transition-all duration-200"
                  >
                    <Image
                      className="mr-2 ml-0 group-data-[collapsible=icon]:mr-0 group-data-[collapsible=icon]:ml-[11px]"
                      src={icon}
                      alt="title"
                      width={18}
                      height={18}
                    />
                    <span className="text-sm/[17px] group-data-[collapsible=icon]:hidden">
                      {t(title)}
                    </span>
                    <Image
                      className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:hidden"
                      src={chevronDown}
                      alt="down-icon"
                      width={18}
                      height={18}
                    />
                    <Image
                      className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 group-data-[collapsible=icon]:ml-0 hidden group-data-[collapsible=icon]:block"
                      src={chevronRight}
                      alt="down-icon"
                      width={16}
                      height={16}
                    />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent
                  className={`grid gap-2 group-data-[collapsible=icon]:fixed group-data-[collapsible=icon]:left-[5rem] group-data-[collapsible=icon]:top-[7rem] group-data-[collapsible=icon]:bg-[hsl(var(--side-bar-card))] group-data-[collapsible=icon]:overflow-y-auto group-data-[collapsible=icon]:max-h-[60vh] ${styles.customScrollbar} bg-transparent py-2`}
                >
                  {options?.map(({ url, title, icon, button }) => {
                    if (!title) return null;
                    return (
                      <Link
                        href={`${button ? '' : url}`}
                        onClick={() => {
                          if (button) {
                            handleClick(url);
                          } else {
                            dispatch({
                              type: 'SET_ROUTE_LOADING',
                              payload: true,
                            });

                            const token = getAccessToken();
                            const publicRoutes = ['/', '/login', '/signup'];

                            if (!token && !publicRoutes.includes(url)) {
                              window.location.href = '/login';
                              return;
                            }

                            toggleDropdown(id);
                            dispatch({
                              type: 'SET_LEFT_PANEL',
                              payload: false,
                            });
                          }
                        }}
                        key={`${id}-${url}`}
                      >
                        <SidebarMenuButton
                          className={`hover:bg-bg-blue-900 group-data-[collapsible=icon]:!p-[1.4rem] group-data-[collapsible=icon]:!w-[10rem]
                        flex items-center gap-2 cursor-pointer transition-colors py-2 px-3 rounded-lg hover:bg-[#2a1a2a] hover:text-yellow-400 text-white`}
                        >
                          {icon && (
                            <Image
                              className="mr-2"
                              src={icon}
                              alt={title}
                              width={18}
                              height={18}
                            />
                          )}
                          <span className="text-white text-sm/[17px] font-semibold">
                            {t(title)}
                          </span>
                        </SidebarMenuButton>
                      </Link>
                    );
                  })}
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        }

        return (
          <React.Fragment key={`${id}-${title}`}>
            {options?.map(({ url, icon, title, button = false }) => {
              if (button) {
                return buttonComponents({ url, id, icon, title });
              } else {
                return (
                  <SidebarMenuItem
                    key={`${id}-${url}`}
                    className={`list-none rounded-xl
                      `}
                  >
                    {title.includes('Promotions') && (
                      <div className="w-full my-2 border-gray-400 border-t"></div>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          onClick={() => handleRedirect(url)}
                          className={`group-data-[collapsible=icon]:!w-[3rem] group-data-[collapsible=icon]:m-auto group-data-[collapsible=icon]:!h-[3rem] group-data-[collapsible=icon]:!px-[1rem]
                          w-full font-bold text-lg flex items-center gap-2 cursor-pointer transition-colors p-3 rounded-lg
                          bg-new-primary hover:bg-[#2a1a2a] hover:text-yellow-400 text-white`}
                        >
                          <div className="flex">
                            <Image
                              className="mr-2"
                              src={icon}
                              alt={title}
                              width={18}
                              height={18}
                            />
                            <span className="text-sm/[17px] font-semibold group-data-[collapsible=icon]:invisible">
                              {t(title)}
                            </span>
                          </div>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" sideOffset={8}>
                        {t(title)}
                      </TooltipContent>
                    </Tooltip>
                    {title.includes('FAQ') && (
                      <div className="w-full my-2 border-gray-400 border-t"></div>
                    )}
                  </SidebarMenuItem>
                );
              }
            })}
          </React.Fragment>
        );
      })}
      <DialogComponentsMapping
        isOpen={isOpen}
        handleClick={handleClick}
        activeUrl={activeUrl}
      />
    </div>
  );
};

export default NavContent;
