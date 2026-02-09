import { createContext, useContext, useState, ReactNode } from "react";

interface SearchParams {
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  category?: string;
}

interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: (params: SearchParams) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: "",
    startDate: undefined,
    endDate: undefined,
    category: undefined,
  });

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
