import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Property } from './types';

type CatalogTabProps = {
  properties: Property[];
};

const CatalogTab = ({ properties }: CatalogTabProps) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const handleBooking = () => {
    toast.success('Бронирование успешно создано!');
    setSelectedProperty(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по локации, названию..."
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <Badge className="absolute top-4 right-4 bg-card/90 backdrop-blur">
                <Icon name="Star" size={14} className="mr-1 fill-accent text-accent-foreground" />
                {property.rating}
              </Badge>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <CardTitle className="text-xl font-serif">{property.title}</CardTitle>
              </div>
              <CardDescription>{property.description}</CardDescription>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Icon name="MapPin" size={14} />
                {property.location}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {property.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold font-serif">{property.price.toLocaleString()} ₽</p>
                  <p className="text-xs text-muted-foreground">за час</p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setSelectedProperty(property)}
                    >
                      <Icon name="Calendar" size={16} className="mr-2" />
                      Забронировать
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl">Бронирование</DialogTitle>
                      <DialogDescription>
                        {selectedProperty?.title}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Дата заезда</Label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Количество часов</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
                              <SelectItem key={hour} value={hour.toString()}>
                                {hour} {hour === 1 ? 'час' : 'часа'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Комментарий</Label>
                        <Textarea placeholder="Дополнительные пожелания..." />
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-2">
                          <span>Стоимость за час:</span>
                          <span className="font-bold">{selectedProperty?.price.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold font-serif">
                          <span>Итого:</span>
                          <span>{(selectedProperty?.price || 0) * 3} ₽</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-primary" onClick={handleBooking}>
                      Подтвердить бронирование
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CatalogTab;
