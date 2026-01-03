import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type UserType = 'client' | 'owner';
type Property = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string;
  rating: number;
  amenities: string[];
  available: boolean;
};

type Booking = {
  id: number;
  propertyTitle: string;
  date: Date;
  hours: number;
  status: 'pending' | 'confirmed' | 'completed';
  total: number;
};

const Index = () => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  const properties: Property[] = [
    {
      id: 1,
      title: 'Люксовые апартаменты в центре',
      description: 'Элегантные апартаменты с панорамными окнами и премиум-отделкой',
      price: 3500,
      location: 'Москва, ЦАО',
      image: 'https://cdn.poehali.dev/projects/6efa19c9-9e0b-412a-90cc-6bec1f123366/files/0fadec12-2ca2-4873-925c-2d5c1534d084.jpg',
      rating: 4.9,
      amenities: ['Wi-Fi', 'Парковка', 'Кондиционер'],
      available: true
    },
    {
      id: 2,
      title: 'Стильная студия в деловом квартале',
      description: 'Современное пространство для работы и отдыха',
      price: 2800,
      location: 'Москва, Сити',
      image: 'https://cdn.poehali.dev/projects/6efa19c9-9e0b-412a-90cc-6bec1f123366/files/e1c46247-701c-4066-87c8-92ef789514d2.jpg',
      rating: 4.8,
      amenities: ['Wi-Fi', 'Кофемашина', 'Терраса'],
      available: true
    },
    {
      id: 3,
      title: 'Премиум-лофт с панорамным видом',
      description: 'Дизайнерское пространство с видом на город',
      price: 4200,
      location: 'Санкт-Петербург, Центр',
      image: 'https://cdn.poehali.dev/projects/6efa19c9-9e0b-412a-90cc-6bec1f123366/files/f7ae5cf4-6036-4291-a70a-372caa9f3328.jpg',
      rating: 5.0,
      amenities: ['Wi-Fi', 'Парковка', 'Джакузи'],
      available: true
    }
  ];

  const bookings: Booking[] = [
    {
      id: 1,
      propertyTitle: 'Люксовые апартаменты в центре',
      date: new Date(2026, 0, 10),
      hours: 4,
      status: 'confirmed',
      total: 14000
    },
    {
      id: 2,
      propertyTitle: 'Стильная студия в деловом квартале',
      date: new Date(2026, 0, 8),
      hours: 3,
      status: 'completed',
      total: 8400
    }
  ];

  const handleBooking = () => {
    toast.success('Бронирование успешно создано!');
    setSelectedProperty(null);
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-muted flex items-center justify-center p-4">
        <div className="max-w-6xl w-full animate-fade-in">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-serif font-bold text-foreground mb-4">
              Премиум Аренда
            </h1>
            <p className="text-xl text-muted-foreground">
              Платформа почасовой аренды премиум-класса
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card 
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2"
              onClick={() => setUserType('client')}
            >
              <CardHeader className="text-center pb-8 pt-10">
                <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Search" size={40} className="text-primary" />
                </div>
                <CardTitle className="text-3xl font-serif">Я ищу жильё</CardTitle>
                <CardDescription className="text-lg mt-4">
                  Найдите идеальное пространство для почасовой аренды
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2"
              onClick={() => setUserType('owner')}
            >
              <CardHeader className="text-center pb-8 pt-10">
                <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                  <Icon name="Home" size={40} className="text-accent-foreground" />
                </div>
                <CardTitle className="text-3xl font-serif">Я владелец</CardTitle>
                <CardDescription className="text-lg mt-4">
                  Управляйте объявлениями и бронированиями
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Icon name="Home" size={24} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-serif font-bold">Премиум Аренда</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userType === 'client' ? 'К' : 'В'}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setUserType(null)}
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue={userType === 'client' ? 'catalog' : 'crm'} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="catalog">
              <Icon name="Grid3x3" size={16} className="mr-2" />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="bookings">
              <Icon name="Calendar" size={16} className="mr-2" />
              Бронирования
            </TabsTrigger>
            <TabsTrigger value="crm">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              CRM
            </TabsTrigger>
            <TabsTrigger value="profile">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="animate-fade-in">
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
          </TabsContent>

          <TabsContent value="bookings" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif font-bold mb-6">Мои бронирования</h2>
              
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-xl font-serif font-bold">{booking.propertyTitle}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="Calendar" size={14} />
                              {booking.date.toLocaleDateString('ru')}
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              {booking.hours} {booking.hours === 1 ? 'час' : 'часа'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <Badge 
                            variant={booking.status === 'completed' ? 'secondary' : 'default'}
                            className="mb-2"
                          >
                            {booking.status === 'pending' && 'Ожидает подтверждения'}
                            {booking.status === 'confirmed' && 'Подтверждено'}
                            {booking.status === 'completed' && 'Завершено'}
                          </Badge>
                          <p className="text-2xl font-bold font-serif">{booking.total.toLocaleString()} ₽</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="crm" className="animate-fade-in">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-serif font-bold">CRM Панель</h2>
                {userType === 'owner' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить объявление
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-2xl">Новое объявление</DialogTitle>
                        <DialogDescription>
                          Заполните информацию о вашем объекте
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Название</Label>
                          <Input placeholder="Например: Люксовые апартаменты" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Описание</Label>
                          <Textarea placeholder="Подробное описание объекта..." />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Цена за час (₽)</Label>
                            <Input type="number" placeholder="3500" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Локация</Label>
                            <Input placeholder="Москва, ЦАО" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Удобства</Label>
                          <Input placeholder="Wi-Fi, Парковка, Кондиционер" />
                        </div>

                        <div className="space-y-2">
                          <Label>Фотографии</Label>
                          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
                            <Icon name="Upload" size={32} className="mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">Нажмите для загрузки фото</p>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-primary" onClick={() => toast.success('Объявление создано!')}>
                        Опубликовать объявление
                      </Button>
                    </DialogContent>
                  </Dialog>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-3 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Активные объявления
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-serif">12</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Бронирований сегодня
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-serif">8</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Доход за месяц
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold font-serif">156,000 ₽</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-serif">Недавние бронирования</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{booking.propertyTitle}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.date.toLocaleDateString('ru')} • {booking.hours} часа
                          </p>
                        </div>
                        <Badge>{booking.status === 'confirmed' ? 'Подтверждено' : 'Завершено'}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Настройки профиля</CardTitle>
                  <CardDescription>
                    Управляйте информацией вашего аккаунта
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                        {userType === 'client' ? 'К' : 'В'}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Изменить фото</Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Имя</Label>
                      <Input placeholder="Ваше имя" />
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="email@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label>Телефон</Label>
                      <Input type="tel" placeholder="+7 (999) 123-45-67" />
                    </div>

                    <div className="space-y-2">
                      <Label>О себе</Label>
                      <Textarea placeholder="Расскажите о себе..." />
                    </div>
                  </div>

                  <Button className="w-full bg-primary">
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
