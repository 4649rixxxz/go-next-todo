import { useState, useEffect } from "react";
import { ChildrenProps } from "@/lib/type";
import { fetchAuthenticatedUser } from "@/features/user";
import { useRouter } from "next/router";
import { isAxiosError } from "axios";

const MemberAuth = ({children}: ChildrenProps) => {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
			try {
				const authUser = await fetchAuthenticatedUser()
        setLoading(false);
			} catch (e: unknown) {
				if (isAxiosError(e)) {
					console.log(e.message)
				}
        router.push('/login');
			}
		}
		init()
  }, []);

  if (loading) {
		return (<div>Loading now.....</div>)
	}
  return <>{children}</>
}

export default MemberAuth;