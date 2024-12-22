import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class IdealWeightCalculator extends JFrame implements ActionListener {
    private JLabel genderLabel, heightLabel, resultLabel;
    private JComboBox<String> genderComboBox;
    private JTextField heightTextField;
    private JButton calculateButton;

    public IdealWeightCalculator() {
        setTitle("Ideal Weight Calculator");
        setSize(300, 200);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Inisialisasi komponen GUI
        genderLabel = new JLabel("Gender:");
        heightLabel = new JLabel("Height (cm):");
        resultLabel = new JLabel();

        String[] genders = {"Male", "Female"};
        genderComboBox = new JComboBox<>(genders);

        heightTextField = new JTextField();

        calculateButton = new JButton("Calculate");
        calculateButton.addActionListener(this);

        // Membuat panel
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(4, 2));
        panel.add(genderLabel);
        panel.add(genderComboBox);
        panel.add(heightLabel);
        panel.add(heightTextField);
        panel.add(calculateButton);
        panel.add(resultLabel);

        // Menambahkan panel ke frame
        add(panel);

        setVisible(true);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                new IdealWeightCalculator();
            }
        });
    }

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == calculateButton) {
            // Mendapatkan nilai jenis kelamin dan tinggi badan dari input pengguna
            String gender = (String) genderComboBox.getSelectedItem();
            int height = Integer.parseInt(heightTextField.getText());

            // Menghitung berat badan ideal
            double idealWeight;
            if (gender.equals("Male")) {
                idealWeight = (height - 100) * 0.9;
            } else {
                idealWeight = (height - 100) * 0.85;
            }

            // Menampilkan hasil perhitungan
            resultLabel.setText("Ideal Weight: " + idealWeight + " kg");
        }
    }
}
