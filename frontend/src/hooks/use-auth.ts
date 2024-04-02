import { useSelector } from "react-redux";
export default function useAuth() {
    const tokenData = useSelector((state) => state?.auth?.tokenData);
    if (tokenData) {
        return true;
    } else {
        return false;
    }
}
