import { useState, useMemo } from "react";
import { Search, Star, ShoppingBag, TrendingUp, Zap, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "הכל" || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-white shadow-sm">
              <Zap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold leading-none tracking-tight text-slate-900">
                DealIsrael
              </span>
              <span className="text-xs font-medium text-rose-600">AliExpress Affiliates</span>
            </div>
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="חפש מוצרים..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border-slate-200 bg-slate-100 pr-9 pl-4 focus-visible:ring-rose-500"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-rose-50 hover:text-rose-600">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-rose-600 via-rose-500 to-orange-500 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <div className="flex flex-col items-start gap-4">
            <Badge className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
              <TrendingUp className="ml-1 h-3 w-3" /> הדילים של היום
            </Badge>
            <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl">
              הדילים הכי שווים ב-AliExpress, נשלחים עד לישראל.
            </h1>
            <p className="max-w-2xl text-base text-rose-100 md:text-lg">
              מבחר מדויק של מוצרים חמים במחירים נהדרים. השתמשו בקישורי השותפים שלנו כדי לתמוך ב-DealIsrael ללא עלות נוספת עליכם.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="lg" className="rounded-full bg-white text-rose-600 hover:bg-rose-50 shadow-md">
                <ShoppingBag className="ml-2 h-4 w-4" /> צפו בהצעות
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Heart className="ml-2 h-4 w-4" /> המועדפים שלי
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="sticky top-[65px] z-40 w-full border-b border-slate-200 bg-slate-50/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 md:px-6 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-rose-100 hover:text-rose-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            {activeCategory === "הכל" ? "כל המוצרים" : activeCategory}
          </h2>
          <span className="text-sm text-slate-500">{filteredProducts.length} מוצרים</span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center">
            <Search className="mb-4 h-10 w-10 text-slate-300" />
            <p className="text-lg font-medium text-slate-600">לא נמצאו מוצרים</p>
            <p className="text-sm text-slate-400">נסה לחפש משהו אחר או להחליף קטגוריה.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
              const isFav = favorites.includes(product.id);
              return (
                <Card key={product.id} className="group overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute right-3 top-3">
                      <Badge className="bg-rose-600 text-white shadow-sm hover:bg-rose-600">-{discount}%</Badge>
                    </div>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={cn(
                        "absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
                        isFav ? "bg-rose-600 text-white" : "bg-white/80 text-slate-600 hover:bg-white"
                      )}
                    >
                      <Heart className={cn("h-4 w-4", isFav && "fill-current")} />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <span className="text-xs font-medium text-rose-600">{product.category}</span>
                    <h3 className="mt-1 line-clamp-2 min-h-[40px] text-sm font-semibold text-slate-800">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                      <span className="text-xs text-slate-400">({product.reviews})</span>
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-bold text-slate-900">${product.price}</span>
                      <span className="text-sm text-slate-400 line-through">${product.oldPrice}</span>
                    </div>
                  </CardContent>
                  <Separator />
                  <CardFooter className="flex gap-2 p-3">
                    <Button asChild className="w-full bg-rose-600 hover:bg-rose-700">
                      <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored">
                        <ShoppingBag className="ml-2 h-4 w-4" /> קנה עכשיו
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" className="shrink-0 border-slate-200 hover:bg-slate-100">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white">
                <Zap className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-bold text-slate-900">DealIsrael</span>
            </div>
            <p className="text-center text-xs text-slate-500">
              כשותף של AliExpress, DealIsrael מקבל עמלה על רכישות שבוצעו דרך הקישורים שלנו. הדבר אינו מוסיף לעלות המוצר עבורך.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}