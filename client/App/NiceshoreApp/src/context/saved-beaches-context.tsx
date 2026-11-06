import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';

type SavedBeachesContextValue = {
  /** Saved beach ids, most recently saved last. */
  savedIds: readonly string[];
  isSaved: (beachId: string) => boolean;
  toggleSaved: (beachId: string) => void;
};

const SavedBeachesContext = createContext<SavedBeachesContextValue | null>(null);

/** Sample saved list from the Saved design, so the screen isn't empty in development. */
const SAMPLE_SAVED = ['liido', 'warsheekh', 'hobyo'];

/**
 * Beaches the user has saved, kept in memory for now.
 *
 * TODO: load and update these through the NiceShore server's saved-beach
 * endpoints once the app talks to it, and drop SAMPLE_SAVED.
 */
export function SavedBeachesProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<readonly string[]>(SAMPLE_SAVED);

  const isSaved = useCallback((beachId: string) => savedIds.includes(beachId), [savedIds]);

  const toggleSaved = useCallback((beachId: string) => {
    setSavedIds((current) =>
      current.includes(beachId) ? current.filter((id) => id !== beachId) : [...current, beachId]
    );
  }, []);

  const value = useMemo(() => ({ savedIds, isSaved, toggleSaved }), [savedIds, isSaved, toggleSaved]);

  return <SavedBeachesContext value={value}>{children}</SavedBeachesContext>;
}

export function useSavedBeaches() {
  const ctx = use(SavedBeachesContext);
  if (!ctx) throw new Error('useSavedBeaches must be used inside <SavedBeachesProvider>.');
  return ctx;
}
