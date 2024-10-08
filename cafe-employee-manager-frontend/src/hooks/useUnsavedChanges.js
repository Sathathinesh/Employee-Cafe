
import { useEffect } from 'react';

const useUnsavedChangesWarning = (unsavedChanges, message = 'You have unsaved changes. Do you want to leave this page?') => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = message; 
        return message; 
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges, message]);
};

export default useUnsavedChangesWarning;
