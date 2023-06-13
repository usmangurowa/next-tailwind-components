import { Store } from "@/components/providers/Store";
import React from "react";

const useStore = () => React.useContext(Store);

export default useStore;
