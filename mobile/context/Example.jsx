import  { useContext, createContext} from 'react';


const ExampleContext = createContext();

export const useExample = () => {
    return useContext(ExampleContext);
};

export default function ExampleProvider({ children }) {
    const value = {};

    return <ExampleProvider.Provider value={value}>{children}</ExampleProvider.Provider>;
}
