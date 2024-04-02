import { useSelector } from "react-redux";
export default function adminAuth() {
    const tokenData = useSelector((state) => state?.auth?.tokenData);

    console.log("tokenData", tokenData)

    if (tokenData?.role === "user") {
        return true;
    } else {
        return false;
    }
}
