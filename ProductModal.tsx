import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, Copy } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  image: string;
  affiliateUrl: string;
};

interface ProductCardProps {
  product: Product;
  onView: () => void;
  onCopy: () => void;
}

export function ProductCard({ product, onView, onCopy }: ProductCardProps) {
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <Card className="group overflow-hidden border-amber-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/10">
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={onView}
      >
        <div
          className="aspect-square w-full bg-gradient-to-br from-amber-100 to-orange-100"
          style={{ backgroundImage: `url(${product.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
          -{discount}%
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-slate-700 backdrop-blur">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {product.rating}
        </div>
      </div>

      <CardContent className="p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-orange-600">
          {product.category}
        </span>
        <h3
          className="mt-1 line-clamp-2 cursor-pointer text-sm font-semibold text-slate-800 transition-colors hover:text-orange-600"
          onClick={onView}
        >
          {product.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900">
            {product.price.toFixed(2)} €
          </span>
          <span className="text-sm text-slate-400 line-through">
            {product.oldPrice.toFixed(2)} €
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {product.reviews} avis
        </p>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button
          size="sm"
          className="flex-1 bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600"
          onClick={() => window.open(product.affiliateUrl, "_blank")}
        >
          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
          Voir l'offre
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="border-amber-200 text-slate-600 hover:bg-amber-50"
          onClick={onCopy}
        >
          <Copy className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}