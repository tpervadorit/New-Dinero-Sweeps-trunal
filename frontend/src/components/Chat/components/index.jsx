/* eslint-disable no-undef */
'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import useChatModule from '../hooks/useChatModule';
import ChatFooter from './chat-footer';
import ChatNav from './chat-nav';
import dynamic from 'next/dynamic';
const ChatConversation = dynamic(() => import('./chat-conversation'), {
  ssr: false,
});
export default function ChatModule({ props }) {
  const { sendMessage, state, webSocketChat, webSocketRainChat, sidebarWidth } =
    useChatModule();
  return (
    <Sidebar
      collapsible="offcanvas"
      side="right"
      open={state.rightPanel}
      width={sidebarWidth}
      className="bg-neutral-900"
      {...props}
    >
      <SidebarHeader className="shadow-xl p-3 bg-neutral-900">
        <ChatNav />
      </SidebarHeader>
      <SidebarContent className="h-full">
        <div className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollable-Content-Home scrollable-Content scrollable-Content-new">
          <ChatConversation
            webSocketChat={webSocketChat}
            webSocketRainChat={webSocketRainChat}
          />
          {/* <ChatGroups/> */}
        </div>
      </SidebarContent>
      <SidebarFooter className="bg-neutral-900 ">
        <ChatFooter sendMessage={sendMessage} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
