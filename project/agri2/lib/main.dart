import 'package:agri2/MyHomePage.dart';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Supabase.initialize(
    url: 'https://ntsvufrozfjxkuxcfcxz.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50c3Z1ZnJvemZqeGt1eGNmY3h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NTA0MzUsImV4cCI6MjA1NDMyNjQzNX0.kfr1etTCuWR15_asHkniTDD2swBwoxhHRx-OqcKS3Mo',
  );
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Supabase Example',
      home: MyHomePage(title: '',),
    );
  }
}
