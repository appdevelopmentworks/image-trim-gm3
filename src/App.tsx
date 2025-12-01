import { useStore } from './store';

import React from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Header } from './components/layout/header';
import { Sidebar } from './components/layout/sidebar';
import { Dropzone } from './components/features/dropzone';
import { ImageGrid } from './components/features/image-grid';
import { CropModal } from './components/features/crop-modal';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <div className="flex flex-grow overflow-hidden">
          <Sidebar />
          <main className="flex-grow p-6 overflow-auto bg-muted/30">
            <div className="max-w-6xl mx-auto space-y-8">
              <Dropzone />
              <ImageGrid />
            </div>
          </main>
        </div>
        <CropModal />
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default App;
