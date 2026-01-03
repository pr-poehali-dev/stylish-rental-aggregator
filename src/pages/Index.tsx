import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import UserTypeSelector from '@/components/rental/UserTypeSelector';
import CatalogTab from '@/components/rental/CatalogTab';
import BookingsTab from '@/components/rental/BookingsTab';
import CRMTab from '@/components/rental/CRMTab';
import ProfileTab from '@/components/rental/ProfileTab';
import { UserType, Property, Booking } from '@/components/rental/types';

const Index = () => {
  const [userType, setUserType] = useState<UserType | null>(null);

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

  if (!userType) {
    return <UserTypeSelector onSelectUserType={setUserType} />;
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

          <TabsContent value="catalog">
            <CatalogTab properties={properties} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingsTab bookings={bookings} />
          </TabsContent>

          <TabsContent value="crm">
            <CRMTab userType={userType} bookings={bookings} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab userType={userType} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
