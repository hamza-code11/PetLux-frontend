"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useGetShopFilters } from "@/hooks/useShop";
import styles from "./ShopSidebar.module.css";

const PRICE_RANGES = [
  { label: "Under $20", min: "0", max: "20" },
  { label: "$20 - $50", min: "20", max: "50" },
  { label: "$50 - $100", min: "50", max: "100" },
  { label: "Over $100", min: "100", max: "99999" },
];

interface Props {
  petTypeSlug?: string;
  categorySlug?: string;
  subcategorySlug?: string;
}

export default function ShopSidebar({ petTypeSlug, categorySlug, subcategorySlug }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>([]);

  // Fetch ALL filters data (no filtering based on URL)
  const { data: filtersData, isLoading } = useGetShopFilters({});

  // Price Range State
  const [selectedPriceRange, setSelectedPriceRange] = useState<{min: string, max: string} | null>(null);

  useEffect(() => {
    const min = searchParams.get("min_price");
    const max = searchParams.get("max_price");
    if (min && max) {
      setSelectedPriceRange({ min, max });
    } else {
      setSelectedPriceRange(null);
    }
  }, [searchParams]);

  // Auto-open accordion for active category
  useEffect(() => {
    if (categorySlug && filtersData?.categories) {
      const activeCat = filtersData.categories.find(c => c.slug === categorySlug);
      if (activeCat) {
        setOpenSections(prev => 
          prev.includes(String(activeCat.id)) ? prev : [...prev, String(activeCat.id)]
        );
      }
    }
  }, [categorySlug, filtersData]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- Handlers ---

  const handlePetTypeChange = (slug: string, checked: boolean) => {
    if (checked) {
      // Agar pet type select karte hain, toh category/subcategory reset karein
      router.push(`/shop/${slug}`);
    } else {
      router.push(`/shop`);
    }
  };

  const handleCategoryChange = (catSlug: string, checked: boolean) => {
    if (checked) {
      // Category select karne par subcategory reset karein
      if (petTypeSlug) {
        router.push(`/shop/${petTypeSlug}/${catSlug}`);
      } else {
        // Agar pet type nahi hai, toh category ke liye pet type dhundhein
        const parentCat = filtersData?.categories.find(c => c.slug === catSlug);
        // Fallback: /shop (kyunki category ke liye pet type chahiye)
        router.push(`/shop`);
      }
    } else {
      if (petTypeSlug) {
        router.push(`/shop/${petTypeSlug}`);
      } else {
        router.push(`/shop`);
      }
    }
  };

  const handleSubcategoryChange = (catSlug: string, subSlug: string, checked: boolean) => {
    if (checked) {
      if (petTypeSlug) {
        router.push(`/shop/${petTypeSlug}/${catSlug}/${subSlug}`);
      } else {
        router.push(`/shop`);
      }
    } else {
      if (petTypeSlug) {
        router.push(`/shop/${petTypeSlug}/${catSlug}`);
      } else {
        router.push(`/shop`);
      }
    }
  };

  const handlePriceChange = (range: {min: string, max: string}) => {
    setSelectedPriceRange(range);
    const params = new URLSearchParams(searchParams.toString());
    params.set("min_price", range.min);
    params.set("max_price", range.max);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleResetFilters = () => {
    router.push("/shop");
  };

  const filterContent = (
    <>
      {/* Reset Button */}
      {(petTypeSlug || categorySlug || subcategorySlug) && (
        <button 
          onClick={handleResetFilters}
          className={styles.resetBtn}
        >
          Reset All Filters
        </button>
      )}

      {/* Pet Types */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Pet Types</h3>
        <ul className={styles.filterList}>
          {isLoading ? (
            <li className={styles.loadingText}>Loading...</li>
          ) : filtersData?.pet_types?.length === 0 ? (
            <li className={styles.loadingText}>No pet types available</li>
          ) : (
            filtersData?.pet_types?.map((item: any) => (
              <li key={item.id}>
                <label className={styles.filterLabel}>
                  <input 
                    type="checkbox" 
                    className={styles.filterCheckbox}
                    checked={petTypeSlug === item.slug}
                    onChange={(e) => handlePetTypeChange(item.slug, e.target.checked)}
                  /> 
                  {item.name}
                </label>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Categories */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Categories</h3>
        <div className={styles.accordionList}>
          {isLoading ? (
            <div className={styles.loadingText}>Loading...</div>
          ) : filtersData?.categories?.length === 0 ? (
            <div className={styles.loadingText}>No categories available</div>
          ) : (
            filtersData?.categories?.map((cat: any) => (
              <div key={cat.id} className={styles.accordionItem}>
                <button 
                  className={`${styles.accordionHeader} ${openSections.includes(String(cat.id)) ? styles.active : ""}`}
                  onClick={() => toggleSection(String(cat.id))}
                >
                  {cat.name}
                  <svg className={styles.chevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                <div className={`${styles.accordionContent} ${openSections.includes(String(cat.id)) ? styles.open : ""}`}>
                  <ul className={styles.subList}>
                    {/* Category Checkbox */}
                    <li>
                      <label className={styles.filterLabel}>
                        <input 
                          type="checkbox" 
                          className={styles.filterCheckbox} 
                          checked={categorySlug === cat.slug && !subcategorySlug}
                          onChange={(e) => handleCategoryChange(cat.slug, e.target.checked)}
                        /> 
                        All {cat.name}
                      </label>
                    </li>
                    {/* Subcategories */}
                    {cat.children?.map((sub: any) => (
                      <li key={sub.id}>
                        <label className={styles.filterLabel}>
                          <input 
                            type="checkbox" 
                            className={styles.filterCheckbox} 
                            checked={subcategorySlug === sub.slug}
                            onChange={(e) => handleSubcategoryChange(cat.slug, sub.slug, e.target.checked)}
                          /> 
                          {sub.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Price Range</h3>
        <ul className={styles.filterList}>
          {PRICE_RANGES.map((range) => (
            <li key={range.label}>
              <label className={styles.filterLabel}>
                <input 
                  type="checkbox" 
                  className={styles.filterCheckbox}
                  checked={selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max}
                  onChange={() => handlePriceChange(range)}
                /> 
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      
      <button className={styles.applyBtn} onClick={() => setIsOpen(false)}>Apply Filters</button>
    </>
  );

  return (
    <>
      <div className={styles.mobileFilterBar}>
        <button className={styles.filterBtn} onClick={() => setIsOpen(true)}>Filters</button>
      </div>
      <aside className={styles.desktopSidebar}>{filterContent}</aside>
      <div className={`${styles.drawerOverlay} ${isOpen ? styles.open : ""}`} onClick={() => setIsOpen(false)}>
        <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.drawerHeader}>
            <h2>Filters</h2>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className={styles.drawerBody}>{filterContent}</div>
        </div>
      </div>
    </>
  );
}


