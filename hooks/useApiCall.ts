import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";

export const handle400Error = (data: any) => {
  toast.error(data.message);
};

export const handleLogout = () => {
  localStorage.clear();
  redirect("/");
};

export const useApiCall = () => {
  const call = async (
    apiCall: () => Promise<any>,
    onSuccess: (data: any) => void,
    onError?: (err?: any) => void
  ) => {
    try {
      const res = await apiCall();
      const { data, status } = res;
      switch (status) {
        case 200:
        case 201:
        case 204:
          onSuccess(data);
          break;
        case 400:
          handle400Error(data);
          if (onError) onError(data);
          break;
        case 401:
          handleLogout();
          if (onError) {
            onError(data);
          } else {
            handle400Error(data);
          }
          break;
        case 403:
          toast.error("Permission denied");
          handleLogout();
          break;
        default:
          if (onError) onError(data);
          break;
      }
    } catch (err) {
      toast.error("Something went wrong");
      if (onError) onError();
    }
  };

  return { call };
};
