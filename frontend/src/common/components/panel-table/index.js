'use client';
import * as Tabs from '@radix-ui/react-tabs';
import { useRouter } from 'next/navigation';

const PanelTabs = ({ activeTab = '', setActiveTab = () => { }, tabControls = [] }) => {
    const router = useRouter(); // Use the Next.js router

    const handleTabChange = (value) => {
        if (!value) {
            router.push('/setting?active=responsibleGambling');
        } else {
            setActiveTab(value);
        }
    };
    
    return (
        <Tabs.Root
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
        >
            <Tabs.List className="flex rounded-full bg-neutral-800 p-1 gap-1 overflow-x-auto">
                {tabControls.map((tab, index) => (
                    <Tabs.Trigger
                        key={tab.value}
                        value={tab.value}
                        className={`text-sm px-4 py-2 rounded-full 
                            ${activeTab === tab.value
                                ? 'bg-yellow-400 hover:bg-yellow-400 text-black font-semibold'
                                : 'text-white hover:bg-neutral-600'
                            }`}
                    >
                        {tab.label}
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
        </Tabs.Root>
    );
};

export default PanelTabs;
