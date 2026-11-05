import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';

type SavedBeachesContextValue = {
  isSaved: (beachId: string) => boolean;
  toggleSaved: (beachId: string) => void;
};

const SavedBeachesContext = createContext<SavedBeachesContextValue | null>(null);

/**
 * Beaches the user has saved, kept in memory for now.
 *
 * TODO: load and update these through the NiceShore server's saved-beach
 * endpoints once the app talks to it.
 */
export function SavedBeachesProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<ReadonlySet<string>>(() => new Set());

  const isSaved = useCallback((beachId: string) => saved.has(beachId), [saved]);

  const toggleSaved = useCallback((beachId: string) => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(beachId)) next.delete(beachId);
      else next.add(beachId);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ isSaved, toggleSaved }), [isSaved, toggleSaved]);

  return <SavedBeachesContext value={value}>{children}</SavedBeachesContext>;
}

export function useSavedBeaches() {
  const ctx = use(SavedBeachesContext);
  if (!ctx) throw new Error('useSavedBeaches must be used inside <SavedBeachesProvider>.');
  return ctx;
}
