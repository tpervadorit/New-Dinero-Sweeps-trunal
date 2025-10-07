import FloatElements from '@/components/FloatElements';
import Footer from '@/components/footer/components';
import NavMobile from '@/components/nav-mobile/components';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Header from '@/components/Header/components';
import SidebarSection from '@/components/SidebarSection';
import SocketProvider from '../SocketProvider';
import ChatModule from './@chat/page';
import AuthGuard from '@/components/AuthGuard';

export default function AppLayout({ children }) {
  return (
    <AuthGuard>
      <SocketProvider>
        <SidebarProvider defaultOpen>
          <SidebarSection />
          <SidebarInset>
            <Header />
            <div className="h-[calc(100vh-121px)] md:h-[calc(100vh-63px)] w-full overflow-y-auto scrollbar-thin scrollable-Content-Home">
              <div className="w-full px-[2vw] py-4 bg-[hsl(var(--new-background))] ">
                <div className="max-w-[1200px] mx-auto">{children}</div>
              </div>
              <FloatElements />
              <Footer />
            </div>
            <NavMobile />
          </SidebarInset>
          {/* Parallel route slot for @chat */}
           <ChatModule />
        </SidebarProvider>
      </SocketProvider>
    </AuthGuard>
  );
}
