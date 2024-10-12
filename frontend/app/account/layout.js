import SideNavigation from "../components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div>
      <div
        className="grid grid-cols-[16rem_1fr]
      h-full gap-12"
      >
        <div>
          <SideNavigation />
        </div>
        <div className="py-1">{children}</div>
      </div>
    </div>
  );
}
