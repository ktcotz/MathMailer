import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [MailModule, ConfigModule.forRoot({ isGlobal: true }), SupabaseModule],
})
export class AppModule {}
