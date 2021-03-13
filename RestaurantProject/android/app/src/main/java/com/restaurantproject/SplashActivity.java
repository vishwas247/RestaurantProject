package com.restaurantproject; // ← Make sure that is your package name

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent fcmIntent = this.getIntent();
        Bundle bundle = fcmIntent.getExtras();

        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtras(fcmIntent);
        startActivity(intent);
        finish();
    }
}