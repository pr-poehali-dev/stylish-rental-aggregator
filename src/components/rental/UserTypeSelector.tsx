import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { UserType } from './types';

type UserTypeSelectorProps = {
  onSelectUserType: (type: UserType) => void;
};

const UserTypeSelector = ({ onSelectUserType }: UserTypeSelectorProps) => {
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
            onClick={() => onSelectUserType('client')}
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
            onClick={() => onSelectUserType('owner')}
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
};

export default UserTypeSelector;
