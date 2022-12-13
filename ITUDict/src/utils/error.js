import { ToastAlert } from "../components/common/ToastAlert";

export const getError = (error, title, toast) => {
  toast.show({
    duration: 3000,
    render: ({ id }) => {
      return <ToastAlert id={id} title={title} description={error?.message || error} status="error" toast={toast} />;
    }
  });
};
