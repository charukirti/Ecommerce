import useGetCurrentUser from "../hooks/auth/useGetCurrentUser";

interface AvatarProps {
  size?: string;
  className?: string;
}

export default function Avatar({ size = "2rem", className = "" }: AvatarProps) {
  const { userData } = useGetCurrentUser();
  const { name, avatar } = userData?.user.user_metadata || {};

  // if there is no avatar show initials
  if (!avatar) {
    const initials =
      name?.[0].toUpperCase() ||
      userData?.user.email?.[0]?.toUpperCase() ||
      "?";

    return (
      <div
        className={`flex items-center justify-center rounded-xl bg-blue-500 font-semibold text-white ${className}`}
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    );
  }

  return (
    <>
      <img
        src={avatar}
        alt={`Avatar of ${name || "user"}`}
        style={{ width: size, height: size }}
        className={`block rounded-xl object-cover object-center ${className}`}
        onError={(e) => {
          // Handle image loading failures
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const initials =
            name?.[0]?.toUpperCase() ||
            userData?.user.email?.[0]?.toUpperCase() ||
            "?";
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
            <div 
              style="width: ${size}; height: ${size}"
              class="flex items-center justify-center bg-blue-500 text-white rounded-xl font-semibold ${className}"
            >
              ${initials}
            </div>
          `;
          }
        }}
      />
    </>
  );
}
