import React, {
    createContext,
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from "react";

type AppContextType = {
    modules: { [key: string]: any } | null;
    setModules: Dispatch<SetStateAction<{ [key: string]: any } | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function useApp(): AppContextType {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
}

const AppProvider = (props: { children: ReactNode }): ReactElement => {
    const [modules, setModules] = useState<{ [key: string]: any } | null>(null);

    return <AppContext.Provider {...props} value={{ modules, setModules }} />;
};

export { AppProvider, useApp };