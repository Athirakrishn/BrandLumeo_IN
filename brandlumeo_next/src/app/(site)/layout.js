// Every page except the home page renders inside this wrapper, which provides the
// black rno1-style canvas defined under `.rn-page` in style.css.
export default function SiteLayout({ children }) {
  return <div className="rn-page">{children}</div>;
}
