import  { useEffect } from 'react';

function ErrorBoundary({ children }: { children: any;  }) {

  useEffect(() => {
    const logError = (error: any) => {
      console.log('Error occurred:', error);
    };


    window.addEventListener('error', logError);

    return () => {
      window.removeEventListener('error', logError);
    };
  }, []);


  return children;
}

export default ErrorBoundary;
