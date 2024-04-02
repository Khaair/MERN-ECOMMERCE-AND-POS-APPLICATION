import { useSelector } from "react-redux";
export default function adminAuth() {
    const tokenData = useSelector((state) => state?.auth?.tokenData);

    if (tokenData?.role === "admin") {
        return true;
    } else {
        return false;
    }
}
