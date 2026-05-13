import { useSearchParams } from "react-router";
import SearchResultpage2 from "./searchresult2.page";
import SearchPage from "./searchresult.page";

const MIRISSA_KEYWORDS = [
  "mirissa", "beach", "beaches", "surfing", "whale", "whale watching",
  "secret beach", "parrot rock", "coconut tree hill", "snorkeling"
];

const TEMPLE_KEYWORDS = [
  "temple", "temples", "ancient", "heritage", "kandy", "buddhist",
  "sigiriya", "dambulla", "polonnaruwa", "anuradhapura", "kataragama",
  "sacred", "relic", "stupa", "unesco", "ruins", "cave temple"
];

export default function SearchRouter() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  const isMirissa = MIRISSA_KEYWORDS.some(kw => query.includes(kw));
  const isTemple  = TEMPLE_KEYWORDS.some(kw => query.includes(kw));

  // If query matches mirissa keywords → show mirissa page
  // If query matches temple keywords → show temple page
  // Default (no match) → show temple page as general search
  if (isMirissa && !isTemple) {
    return <SearchResultpage2 />;
  }

  return <SearchPage />;
}