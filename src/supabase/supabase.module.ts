import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SupabaseController } from './supabase.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [SupabaseService, MailService],
  controllers: [SupabaseController],
})
export class SupabaseModule {}
