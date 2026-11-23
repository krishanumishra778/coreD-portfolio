import { Link, useLocation } from "react-router-dom";
import { breadcrumbs, resolveMetadata } from "../../data/siteMetadata.js";

export default function Breadcrumbs() {
  const { pathname, search } = useLocation();
  const trail = breadcrumbs(resolveMetadata(pathname, search));
  if (!trail.length) return null;
  return <nav className="cd-shell cd-breadcrumbs" aria-label="Breadcrumb"><ol>
    {trail.map((item, index) => <li key={item.path}>
      {index === trail.length - 1 ? <span aria-current="page">{item.name}</span> : <Link to={item.path}>{item.name}</Link>}
    </li>)}
  </ol></nav>;
}
